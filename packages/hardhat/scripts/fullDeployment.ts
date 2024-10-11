import hre from "hardhat";

async function main() {

    
    function logContractDeployed(contractName: string, contract: any) {
        console.log(`${contractName} deployed to: ${contract.target}`);
    }

    // Deploy Collateral Manager
    const Coll = await hre.ethers.getContractFactory("CollateralManager");
    const coll = await Coll.deploy("0x036CbD53842c5426634e7929541eC2318f3dCF7e", {});
    await coll.waitForDeployment();
    logContractDeployed("CollateralManager", coll);

    // Deploy Loan Manager
    const Loan = await hre.ethers.getContractFactory("LoanManager");
    const loan = await Loan.deploy("0x036CbD53842c5426634e7929541eC2318f3dCF7e", coll.target, {});
    await loan.waitForDeployment();
    logContractDeployed("LoanManager", loan);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
