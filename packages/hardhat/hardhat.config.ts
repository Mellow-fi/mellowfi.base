import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    // mainnet
    "base-mainnet":{
        url: "https://mainnet.base.org",
        accounts: [process.env.WALLET_KEY as string],
        gasPrice: 1000000000,
    },
    // Sepolia Testnet
    "base-sepolia": {
        url:"https://sepolia.base.org",
        accounts:[process.env.WALLET_KEY as string],
        gasPrice: 1000000000,
    },
    // Local dev environment
    "base-local": {
        url:"http://localhost:8545",
        accounts:[process.env.WALLET_KEY as string],
        gasPrice: 1000000000,
    },
  },
  etherscan:{
    apiKey: {
        "baseSepolia": [process.env.BSCANKEY as string],
    },
  customChains: [
    {
    network: "base-sepolia",
    chainID: 84532,
    urls: {
        apiURL: "https://api-sepolia.basescan.org/api",
        browserURL: "https://sepolia.basescan.org",
    },
    },
  ],
  },
    defualtNetwork: "hardhat",
};

export default config;
