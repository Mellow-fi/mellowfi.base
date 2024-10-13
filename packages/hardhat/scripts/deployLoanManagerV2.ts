import hre from "hardhat";

async function main() {

    
    function logContractDeployed(contractName: string, contract: any) {
        console.log(`${contractName} deployed to: ${contract.target}`);
    }


    // Deploy Loan Manager
    const Loan = await hre.ethers.getContractFactory("MellowFinanceLoanManager");
    const loan = await Loan.deploy("0x0c211c2A104eb0415b33F453f2699265760A5A51");
    await loan.waitForDeployment();
    logContractDeployed("LoanManager", loan);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

