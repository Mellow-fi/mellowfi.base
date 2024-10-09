// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract CollateralManager is ReentrancyGuard, Pausable, Ownable {

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

    constructor(ERC20 _collateralToken) Ownable(msg.sender){
        stablecoinDepositToken = _collateralToken; // this will be the address of the stablecoin that users can deposit. For now only USDT
    }

    function depositNativeCollateral() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "CollateralManager: Invalid amount"); // SHould there be a minimum amount?
        userCollateralNative[msg.sender] += msg.value; // Keep track of the user's collateral
        totalCollateralNative += msg.value; // Keep track of the total collateral
        emit NativeCollateralDeposited(msg.sender, msg.value); // Emit an event
    }

    function withdrawNativeCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(userCollateralNative[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralNative[msg.sender] -= _amount;
        totalCollateralNative -= _amount;
        payable(msg.sender).transfer(_amount);
        emit NativeCollateralWithdrawn(msg.sender, _amount);

        
    }

    function depositStableCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(stablecoinDepositToken.transferFrom(msg.sender, address(this), _amount), "CollateralManager: Transfer failed");
        userCollateralStable[msg.sender] += _amount;
        totalCollateralStable += _amount;
        emit StableDeposited(msg.sender, _amount);
    }

    function withdrawStableCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(userCollateralStable[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralStable[msg.sender] -= _amount;
        totalCollateralStable -= _amount;
        require(stablecoinDepositToken.transfer(msg.sender, _amount), "CollateralManager: Transfer failed");
        emit StableWithdrawn(msg.sender, _amount);
    }

    function getCollateralBalance(address _user) external view returns (uint256 native_balance, uint256 stable_balance) {
        return (userCollateralNative[_user], userCollateralStable[_user]);
    }
    // get the total collateral in USD
    // function getCollateralBalanceinUSD(address _user) external view returns (uint256) {
    //     uint256 celoPriceInUSD = uint256(priceOracle.getCeloPrice());
    //     uint256 usdtPriceInUSD = uint256(priceOracle.getUsdtPrice());
    //     uint256 totalCollateralInUSD = (userCollateralCelo[_user] * celoPriceInUSD) / 1e10 + (userCollateralUsdt[_user] * usdtPriceInUSD) / (1e10);
    //     return totalCollateralInUSD;
    // }

    function releaseFunds(address user) external nonReentrant{
        payable(user).transfer(userCollateralStable[user]);
        stablecoinDepositToken.transfer(user, userCollateralStable[user]);
        userCollateralNative[user] = 0;
        userCollateralStable[user] = 0;
    }

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
}