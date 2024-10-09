// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract CollateralManager is ReentrancyGuard, Pausable, Ownable {

    ERC20 public usdtToken;
    uint256 public totalCollateralCelo;
    uint256 public totalCollateralUsdt;    

    // Mapping for user's collateral balance in Celo and USDT
    mapping(address => uint256) public userCollateralCelo;
    mapping(address => uint256) public userCollateralUsdt;

    event CeloCollateralDeposited(address indexed user, uint256 amount);
    event CeloCollateralWithdrawn(address indexed user, uint256 amount);
    event UsdtCollateralDeposited(address indexed user, uint256 amount);
    event UsdtCollateralWithdrawn(address indexed user, uint256 amount);

    constructor(ERC20 _collateralToken) Ownable(msg.sender){
        usdtToken = _collateralToken;
    }

    function depositCeloCollateral() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "CollateralManager: Invalid amount"); // SHould there be a minimum amount?
        userCollateralCelo[msg.sender] += msg.value; // Keep track of the user's collateral
        totalCollateralCelo += msg.value; // Keep track of the total collateral
        emit CeloCollateralDeposited(msg.sender, msg.value); // Emit an event
    }

    function withdrawCeloCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(userCollateralCelo[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralCelo[msg.sender] -= _amount;
        totalCollateralCelo -= _amount;
        payable(msg.sender).transfer(_amount);
        emit CeloCollateralWithdrawn(msg.sender, _amount);

        
    }

    function depositUsdtCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(usdtToken.transferFrom(msg.sender, address(this), _amount), "CollateralManager: Transfer failed");
        userCollateralUsdt[msg.sender] += _amount;
        totalCollateralUsdt += _amount;
        emit UsdtCollateralDeposited(msg.sender, _amount);
    }

    function withdrawUsdtCollateral(uint256 _amount) external nonReentrant whenNotPaused {
        // How can I make sure they don't have a loan out?
        require(_amount > 0, "CollateralManager: Invalid amount");
        require(userCollateralUsdt[msg.sender] >= _amount, "CollateralManager: Insufficient balance");
        userCollateralUsdt[msg.sender] -= _amount;
        totalCollateralUsdt -= _amount;
        require(usdtToken.transfer(msg.sender, _amount), "CollateralManager: Transfer failed");
        emit UsdtCollateralWithdrawn(msg.sender, _amount);
    }

    function getCollateralBalance(address _user) external view returns (uint256 celo, uint256 usdt) {
        return (userCollateralCelo[_user], userCollateralUsdt[_user]);
    }
    // get the total collateral in USD
    // function getCollateralBalanceinUSD(address _user) external view returns (uint256) {
    //     uint256 celoPriceInUSD = uint256(priceOracle.getCeloPrice());
    //     uint256 usdtPriceInUSD = uint256(priceOracle.getUsdtPrice());
    //     uint256 totalCollateralInUSD = (userCollateralCelo[_user] * celoPriceInUSD) / 1e10 + (userCollateralUsdt[_user] * usdtPriceInUSD) / (1e10);
    //     return totalCollateralInUSD;
    // }

    function releaseFunds(address user) external nonReentrant{
        payable(user).transfer(userCollateralCelo[user]);
        usdtToken.transfer(user, userCollateralUsdt[user]);
        userCollateralCelo[user] = 0;
        userCollateralUsdt[user] = 0;
    }

    function liquidateCollateral(address user) external nonReentrant{
        
        userCollateralCelo[user] = 0;
        userCollateralUsdt[user] = 0;
    }


    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}