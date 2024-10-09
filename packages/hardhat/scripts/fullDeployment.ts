import hre from "hardhat";

async function main() {

    
    function logContractDeployed(contractName: string, contract: any) {
        console.log(`${contractName} deployed to: ${contract.target}`);
    }

    // Deploy Collateral Manager
    const Coll = await hre.ethers.getContractFactory("CollateralManager");
    const coll = await Coll.deploy("0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f", {});
    await coll.waitForDeployment();
    logContractDeployed("CollateralManager", coll);

    // Deploy Loan Manager
    const Loan = await hre.ethers.getContractFactory("LoanManager");
    const loan = await Loan.deploy("0x874069fa1eb16d44d622f2e0ca25eea172369bc1", coll.target, {});
    await loan.waitForDeployment();
    logContractDeployed("LoanManager", loan);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
