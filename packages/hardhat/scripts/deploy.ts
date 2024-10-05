import {ethers} from "hardhat";

async function main() {

    const HelloWorld = await ethers.deployContract("HelloWorld");
    await HelloWorld.waitForDeployment();

    console.log("HelloWorld contract Deployed at "+ HelloWorld.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
