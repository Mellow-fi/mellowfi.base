# Mellow Finance Smart Contracts 🐱💰

This repository contains the core smart contracts for **Mellow Finance**, a decentralized loan management system. The two main components are the **Loan Manager** and the **Collateral Manager**, which allow users to take out loans backed by collateral and manage collateral deposits in both native coins and stablecoins.

## Contracts Overview

### 1. **MellowFinanceLoanManager.sol**
The `MellowFinanceLoanManager` contract facilitates the creation, management, and repayment of loans using USDC (on Base Sepolia). It interacts with a separate collateral management contract to determine loan eligibility based on the user's collateral. Some key features include:

- **Loan Requests and Repayments**: Users can request loans based on their collateral. Loans accrue interest over time and can be repaid with the possibility of recovering collateral.
- **Collateral-Based Lending**: The loan amount is determined by the collateral value, which is fetched from a price feed using Chainlink oracles.
- **User Credit Scoring**: Each user's loan history (repaid vs defaulted loans) is tracked, which affects their credit score.
- **Interest Calculation**: The loan interest rate can vary, and interest accrues daily.
- **Emergency Controls**: The contract owner can pause and unpause the contract in case of an emergency.
- **Collateral Liquidation**: If a loan defaults, the user's collateral can be liquidated to cover the loan.
- **Fund Management**: The owner can add or return funds to the contract’s pool.

#### Events
- `LoanRequested`: Emitted when a user requests a loan.
- `LoanIssued`: Emitted when a loan is successfully issued.
- `LoanRepaid`: Emitted upon successful repayment of a loan.
- `LoanDefaulted`: Emitted when a loan defaults and collateral is liquidated.
- `FundAdded`: Emitted when funds are added to the loan pool.
- `EmergencyPaused` & `EmergencyUnpaused`: Emitted when the contract is paused or unpaused.

### 2. **MellowFinanceCollateralManager.sol**
The `MellowFinanceCollateralManager` contract manages user deposits in native coins (e.g., baseETH) and stablecoins (e.g., USDC). It keeps track of collateral balances for users and interacts with the Loan Manager to release or liquidate collateral when necessary.

- **Deposit/Withdraw Collateral**: Users can deposit and withdraw both native coins and stablecoins as collateral.
- **Collateral Management**: Collateral is held in the contract, and balances are tracked for each user. The contract ensures that collateral can only be withdrawn when no active loans exist.
- **Emergency Controls**: Similar to the Loan Manager, the contract can be paused or unpaused by the owner in case of an emergency.

#### Events
- `NativeCollateralDeposited`: Emitted when a user deposits native coins.
- `NativeCollateralWithdrawn`: Emitted when a user withdraws native coins.
- `StableDeposited`: Emitted when a user deposits stablecoins.
- `StableWithdrawn`: Emitted when a user withdraws stablecoins.

## Setup

### Requirements
- **Solidity Version**: ^0.8.0
- **Dependencies**: 
  - OpenZeppelin Contracts (ERC20, Ownable, Pausable, ReentrancyGuard)
  - Chainlink Price Feed Aggregators (for price feeds of native and stablecoins)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mellow-fi/mellowfi.base.git

cd mellowfi.base/packages/hardhat
```

2. Install dependencies using your package manager:

```bash
npm install @openzeppelin/contracts
npm install @chainlink/contracts
```

3. Compile the contracts:

```bash
npx hardhat compile
```

### Deployment

You will need to update the constructor arguments in the `MellowFinanceLoanManager.sol` and `MellowFinanceCollateralManager.sol` contracts to deploy them to a blockchain network. Ensure that the contract addresses for stablecoin tokens (USDC) and price feeds are correct for your chosen network.

To deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Usage

1. **Loan Manager**:
   - Call `requestLoan()` to apply for a loan based on your collateral.
   - Call `repayLoan()` to repay an active loan with interest.
   - Call `liquidateCollateral()` (admin only) to liquidate a defaulted loan’s collateral.

2. **Collateral Manager**:
   - Call `depositNativeCollateral()` to deposit native coins as collateral.
   - Call `depositStableCollateral()` to deposit USDC as collateral.
   - Call `withdrawNativeCollateral()` or `withdrawStableCollateral()` to withdraw your collateral if no active loans exist.

## License

These contracts are licensed under the MIT License.

