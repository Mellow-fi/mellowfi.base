// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./MellowFiCollateralManager.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MellowFinanceLoanManager is ReentrancyGuard, Ownable, Pausable {

    ERC20 public cUSDToken; 
    MellowFinanceCollateralManager public collateralManager;
    uint256 public fundPool;
    uint256 public constant LOAN_SIZE_FACTOR = 5;

    uint256 public defaultDuration = 15 days;   // Extra time before liquidation after loan is due
    uint256 public baseInterestRate = 5; // Base interest rate in percentage (can vary)
    
    AggregatorV3Interface internal nativePriceFeed;
    AggregatorV3Interface internal stablePriceFeed;

    struct Loan {
        uint256 amount; // amount in USDC (6 decimals)
        uint256 interestRate;
        uint256 startTime;
        uint256 collateral; // Collateral in USD (6 decimals)
        uint256 collateralRatio;
        bool isRepaid;
        bool isDefaulted;
    }

    struct UserCredit {
        uint256 totalLoansRepaid;
        uint256 totalLoansDefaulted;
        uint256 creditScore;
        uint256 lastLoanAmount;
    }

    mapping(address => Loan) public userLoans;
    mapping(address => UserCredit) public userCreditScores;

    event LoanRequested(address indexed user, uint256 amount, uint256 collateral);
    event LoanIssued(address indexed user, uint256 amount, uint256 collateral);
    event LoanRepaid(address indexed user, uint256 amount, uint256 collateralReturned);
    event LoanDefaulted(address indexed user, uint256 collateralLiquidated);
    event FundAdded(uint256 amount);
    event EmergencyPaused();
    event EmergencyUnpaused();

    constructor(address _MFCM) Ownable(msg.sender) {
        cUSDToken = ERC20(0x036CbD53842c5426634e7929541eC2318f3dCF7e ); // USDC on BASE SEPOLIA
        collateralManager = MellowFinanceCollateralManager(_MFCM); // COLLATERAL MANAGER on BASE SEPOLIA
        nativePriceFeed = AggregatorV3Interface(0x3c65e28D357a37589e1C7C86044a9f44dDC17134); // baseETH price in cUSD in 6 decimal places
        stablePriceFeed = AggregatorV3Interface(0x3ec8593F930EA45ea58c968260e6e9FF53FC934f); // USDC price in USD in 6 decimal places
    }

    // TO-DO: IMPLEMENT LOGIC FOR MULTISIG WALLETS 
    // modifier onlyMultiSigOwner() {
    //     // Placeholder for multi-signature logic (e.g., a multi-sig wallet or Gnosis safe)
    //     require(msg.sender == owner(), "LoanManager: Multi-signature required");
    //     _;
    // }

    // Emergency stop mechanism
    function pause() external onlyOwner {
        _pause();
        emit EmergencyPaused();
    }

    function unpause() external onlyOwner {
        _unpause();
        emit EmergencyUnpaused();
    }

    // Fetches the latest price of chain native coin from Chainlink Price Feed
    function getNativePrice() public view returns (int) {
        (, int price,,,) = nativePriceFeed.latestRoundData();
        return price;
    }

    // Fetches the latest price of USDC from Chainlink Price Feed
    function getStablePrice() public view returns (int) {
        (, int price,,,) = stablePriceFeed.latestRoundData();
        return price;
    }

    // function getCollinUSD() public view returns (uint256) {
    // (uint256 userColNative, uint256 userColStable) = collateralManager.getCollateralBalance(msg.sender);
    // uint256 nativePriceInUSD = uint256(getNativePrice());
    // uint256 stablePriceInUSD = uint256(getStablePrice());

    // uint256 nativeCollateralInUSD = (userColNative * nativePriceInUSD);
    // uint256 stableCollateralInUSD = (userColStable * stablePriceInUSD);
    // uint256 userTotalColinUSD = nativeCollateralInUSD + stableCollateralInUSD;
    // return (userTotalColinUSD);
    // }

    function getCollinUSD(address _user) public view returns (uint256) {
        (uint256 userColNative, uint256 userColStable) = collateralManager.getCollateralBalance(_user);
        uint256 nativePriceInUSD = uint256(getNativePrice());
        uint256 stablePriceInUSD = uint256(getStablePrice());

        uint256 nativeCollateralInUSD = (userColNative * nativePriceInUSD) / 1e8;
        uint256 stableCollateralInUSD = (userColStable * stablePriceInUSD) / 1e6; 
        uint256 userTotalColinUSD = nativeCollateralInUSD + stableCollateralInUSD;
        return (userTotalColinUSD);
    }



    // Request a loan based on the user's collateral
    function requestLoan(uint256 _loanAmount, uint256 _desiredInterestRate) external nonReentrant whenNotPaused {
        require(_loanAmount > 0, "LoanManager: Loan amount must be greater than 0");
        require(userLoans[msg.sender].amount == 0, "LoanManager: Existing loan must be repaid first");

        // Check user collateral and calculate max loan
        uint256 userTotalColinUSD = getCollinUSD(msg.sender);
        uint256 collateralRatio = 150; // Default collateral ratio (can vary based on credit score)
        uint256 maxLoanAmount = (userTotalColinUSD * 100) / collateralRatio;

        require(_loanAmount <= maxLoanAmount, "LoanManager: Insufficient collateral");


        // Store loan information
        Loan memory newLoan = Loan({
            amount: _loanAmount,
            interestRate: _desiredInterestRate > baseInterestRate ? _desiredInterestRate : baseInterestRate,
            startTime: block.timestamp,
            collateral: userTotalColinUSD,
            collateralRatio: collateralRatio,
            isRepaid: false,
            isDefaulted: false
        });
        userLoans[msg.sender] = newLoan;

        require(cUSDToken.transfer(msg.sender, _loanAmount), "LoanManager: Loan transfer failed");

        // Emit loan requested event
        fundPool -= _loanAmount;
        emit LoanRequested(msg.sender, _loanAmount, userTotalColinUSD);
        emit LoanIssued(msg.sender, _loanAmount, userTotalColinUSD);
        
    }

    
    // Partial loan repayment with interest accrual
    function repayLoan(uint256 _repayAmount) external nonReentrant whenNotPaused {
        Loan storage loan = userLoans[msg.sender];
        require(loan.amount > 0, "LoanManager: No active loan");
        require(!loan.isRepaid, "LoanManager: Loan is already repaid");

        uint256 loanWithInterest = calculateLoanWithInterest(msg.sender);
        require(_repayAmount >= loanWithInterest, "LoanManager: Insufficient repayment");

        cUSDToken.transferFrom(msg.sender, address(this), _repayAmount);

        loan.isRepaid = true;
        updateUserCreditScore(msg.sender, true);

        collateralManager.releaseFunds(msg.sender);
        emit LoanRepaid(msg.sender, loan.amount, loan.collateral);
    }


    function getMaxLoan() public view returns (uint256) {
        uint256 userTotalColinUSD = getCollinUSD(msg.sender);
        uint256 maxLoanAmount = (userTotalColinUSD * 100) / 150;
        return maxLoanAmount;
    }

    function calculateLoanWithInterest(address _user) public view returns (uint256) {
        Loan memory loan = userLoans[_user];
        uint256 timeElapsed = block.timestamp - loan.startTime;
        uint256 accruedInterest = (loan.amount * loan.interestRate * timeElapsed) / (365 days * 100); // Interest accrues daily
        return loan.amount + accruedInterest;
    }

    // Function to extend the loan duration
    function extendLoanDuration(address _user, uint256 _extraTime) external onlyOwner {
        Loan storage loan = userLoans[_user];
        require(loan.amount > 0, "LoanManager: No active loan");
        loan.startTime += _extraTime;
    }

    // Update user credit score after loan repayment or default
    function updateUserCreditScore(address _user, bool isRepaid) internal {
    UserCredit storage credit = userCreditScores[_user];
    uint256 loanAmount = userLoans[_user].amount;

    if (isRepaid) {
        credit.totalLoansRepaid++;
        // Increase credit score based on loan size
        credit.creditScore += loanAmount * LOAN_SIZE_FACTOR;
    } else {
        credit.totalLoansDefaulted++;
        // Decrease credit score based on loan size
        credit.creditScore -= loanAmount * LOAN_SIZE_FACTOR;
    }

    // Example scoring system: Simple credit score increase/decrease based on repayment/default history
    credit.creditScore += credit.totalLoansRepaid * 10 - credit.totalLoansDefaulted * 5;

    // Update last loan amount
    credit.lastLoanAmount = loanAmount;
}

    // Add funds to the loan pool
    function addFunds(uint256 _amount) external onlyOwner {
        require(cUSDToken.transferFrom(msg.sender, address(this), _amount), "LoanManager: Fund transfer failed");
        fundPool += _amount;
        emit FundAdded(_amount);
    }

    // Liquidate collateral if a loan is defaulted
    function liquidateCollateral(address _user) external onlyOwner nonReentrant {
        Loan storage loan = userLoans[_user];
        require(loan.amount > 0, "LoanManager: No active loan");
        require(block.timestamp > loan.startTime + loan.collateralRatio + defaultDuration, "LoanManager: Loan not defaulted yet");

        loan.isDefaulted = true;
        updateUserCreditScore(_user, false);

        collateralManager.liquidateCollateral(_user);

        emit LoanDefaulted(_user, loan.collateral);
    }


    // make sure the fund pool is emptied before upgrading contracts
    function returnFunds() public onlyOwner {
        cUSDToken.transfer(owner(), cUSDToken.balanceOf(address(this)));
        fundPool = 0;
    }
}
