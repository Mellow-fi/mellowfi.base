// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract MellowFinanceCollateralManager is ReentrancyGuard, Pausable, Ownable {

    ERC20 public stablecoinDepositToken;
    uint256 public totalCollateralNative; // Contract Balance of native coin
    uint256 public totalCollateralStable;    // Contract balance of stable coins

    // Mapping for user's collateral balance in Celo and USDT
    mapping(address => uint256) public userCollateralNative; // This will track the users deposited collateral in the native coin
    mapping(address => uint256) public userCollateralStable; // This will track the users deposited collateral in the stable coin

    event NativeCollateralDeposited(address indexed user, uint256 amount);
    event NativeCollateralWithdrawn(address indexed user, uint256 amount);
    event StableDeposited(address indexed user, uint256 amount);
    event StableWithdrawn(address indexed user, uint256 amount);
    event FundsReleased(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender){
        stablecoinDepositToken = ERC20(0x036CbD53842c5426634e7929541eC2318f3dCF7e); // this will be the address of the stablecoin that users can deposit. For now only USDC
    }

    /**
     * @dev Function to deposit native collateral
     */

    function depositNativeCollateral() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "CollateralManager: Please Deposit an amount greater than 0"); // SHould there be a minimum amount?
        userCollateralNative[msg.sender] += msg.value; // Keep track of the user's collateral
        totalCollateralNative += msg.value; // Keep track of the total collateral
        emit NativeCollateralDeposited(msg.sender, msg.value); // Emit an event
    }

    /**
     * @dev Function to withdraw native collateral
     * @param _amount Amount of native collateral to withdraw
     */
    function withdrawNativeCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Please withdraw an amount greater than 0");
        require(userCollateralNative[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralNative[msg.sender] -= _amount;
        totalCollateralNative -= _amount;
        payable(msg.sender).transfer(_amount);
        emit NativeCollateralWithdrawn(msg.sender, _amount);

        
    }

    /**
     * @dev Function to deposit stable collateral
     * @param _amount Amount of stable collateral to deposit
     */

    function depositStableCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount > 0, "CollateralManager: Invalid amount");
        stablecoinDepositToken.transferFrom(msg.sender, address(this), _amount);
        userCollateralStable[msg.sender] += _amount;
        totalCollateralStable += _amount;
        emit StableDeposited(msg.sender, _amount);
    }

    /**
     * @dev Function to withdraw stable collateral
     * @param _amount Amount of stable collateral to withdraw
     */

    function withdrawStableCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(userCollateralStable[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralStable[msg.sender] -= _amount;
        totalCollateralStable -= _amount;
        stablecoinDepositToken.transfer(msg.sender, _amount);
        emit StableWithdrawn(msg.sender, _amount);
    }

    /**
     * @dev Function to get user's collateral balance
     * @param _user User's address
     * @return native_balance User's native collateral balance
     * @return stable_balance User's stable collateral balance
     */
    function getCollateralBalance(address _user) external view returns (uint256 native_balance, uint256 stable_balance) {
        return (userCollateralNative[_user], userCollateralStable[_user]);
    }


    /**
     * @dev Function to return users deposited funds
     * @param user User's address
     */
    function releaseFunds(address user) external nonReentrant{
        uint256 userCollNative = userCollateralNative[user];
        uint256 userCollStable = userCollateralStable[user];
        userCollateralNative[user] = 0; // reset the user's collateral
        userCollateralStable[user] = 0; // reset the user's collateral
        payable(user).transfer(userCollNative); // transfer the user's collateral
        stablecoinDepositToken.transfer(user, userCollStable); // transfer the user's collateral
        // emit event
        emit FundsReleased(user, userCollNative);
        emit FundsReleased(user, userCollStable);
        
    }

    /**
     * @dev Function to liquidate user's collateral
     * @param user User's address
     */

    function liquidateCollateral(address user) external nonReentrant{
        
        userCollateralNative[user] = 0;
        userCollateralStable[user] = 0;
    }


    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Function to return funds to the owner
     */
    
    function returnFunds() public onlyOwner {
        stablecoinDepositToken.transfer(owner(), stablecoinDepositToken.balanceOf(address(this)));
        payable(msg.sender).transfer(address(this).balance);

        
    }
}