import { BrowserProvider, Contract, parseUnits } from "ethers";
import { useAccount, Config, useWriteContract, useReadContract } from "wagmi";
import {WriteContractMutate} from "wagmi/query";
import { useState, useEffect } from "react";
import StableTokenABI from "./cusd-abi.json";
import CollateralManagerABI from "./MellowFinanceCollateralManager.json";
import LoanManagerABI from "./MellowFinanceLoanManager.json"
import { Address } from "viem";
import { readContract } from "viem/actions";

export const useWeb3 = () => {
  const { address } = useAccount();
  const COLLATERAL_MANAGER_CONTRACT = "0x0c211c2A104eb0415b33F453f2699265760A5A51";
  const USDC_CONTRACT_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const LOAN_MANAGER_CONTRACT = "0x93a731F8533B08a9C64a06507B29D1718996E95b";

  const {writeContract} = useWriteContract();

  

  const getSigner = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      return await provider.getSigner();
    }
    throw new Error("No Ethereum provider found");
  };

  interface ExecuteTransactionParams {
    contractAddress: string;
    abi: any;
    method: string;
    args: any[];
  }

  const executeTransaction = async ({ contractAddress, abi, method, args }: ExecuteTransactionParams): Promise<any> => {
    const signer = await getSigner();
    const contract = new Contract(contractAddress, abi, signer);
    const tx = await contract[method](...args);
    await tx.wait();
    return tx;
  };

  const executeReadOnly = async ({ contractAddress, abi, method, args }: ExecuteTransactionParams): Promise<any> => {
    const signer = await getSigner();
    const contract = new Contract(contractAddress, abi, signer);
    const result = await contract[method](...args);  // Call the read-only method
    return result;  // Return the result directly
  };

  const depositNativeCollateral = async (amount: string, func: WriteContractMutate<Config,unknown>) => {
    const amountInWei = parseUnits(amount, 18);

    try{
      const tx = writeContract({
        abi: CollateralManagerABI.abi,
        address: COLLATERAL_MANAGER_CONTRACT,
        functionName: "depositNativeCollateral",
        value: amountInWei,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const depositStableCollateral = async (amount: string, func: WriteContractMutate<Config,unknown>) => {
    const amountInWei = parseUnits(amount, 6);

    try{
      writeContract({
        abi: StableTokenABI.abi,
        address: USDC_CONTRACT_ADDRESS,
        functionName: "approve",
        args: [COLLATERAL_MANAGER_CONTRACT, amountInWei],
      });

      const tx = writeContract({
        abi: CollateralManagerABI.abi,
        address: COLLATERAL_MANAGER_CONTRACT,
        functionName: "depositStableCollateral",
        args: [amountInWei],
      });
      console.log(tx);
      // return tx;
    } catch (e) {
      console.error(e);
    }


    // Approve the collateral manager to spend USDT
    // await executeTransaction({ contractAddress: cUER_CONTRACT_ADDRESS, abi: StableTokenABI.abi, method: "approve", args: [COLLATERAL_MANAGER_CONTRACT, amountInWei] });

    // Deposit USDT collateral
    // return await executeTransaction({ contractAddress: COLLATERAL_MANAGER_CONTRACT, abi: CollateralManagerABI.abi, method: "depositStableCollateral", args: [amountInWei] });
  };

  // const getMaxLoanAmount = async () => {
  //   try{
  //     const tx = useReadContract({
  //       abi: LoanManagerABI.abi,
  //       address: LOAN_MANAGER_CONTRACT,
  //       functionName: "getMaxLoanAmount",
  //       args: [address],
  //     })
  //     return tx;
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // };

  

  const requestLoan = async (amount: string) => {
    const amountInWei = parseUnits(amount, 18);
    return await executeTransaction({ contractAddress: LOAN_MANAGER_CONTRACT, abi: LoanManagerABI.abi, method: "requestLoan", args: [amountInWei] });
  }

  const repayLoan = async (amount: string) => {
    const amountInWei = parseUnits(amount, 18);
    return await executeTransaction({ contractAddress: LOAN_MANAGER_CONTRACT, abi: LoanManagerABI.abi, method: "repayLoan", args: [amountInWei] });
  }

  const getLoanBalancewithInterest = async () => {
    // return await executeReadOnly({ contractAddress: LOAN_MANAGER_CONTRACT, abi: LoanManagerABI.abi, method: "getLoanBalancewithInterest", args: [address] });
    return 1
  }

  const releaseFunds = async () => {
    return await executeTransaction({ contractAddress: COLLATERAL_MANAGER_CONTRACT, abi: CollateralManagerABI.abi, method: "releaseFunds", args: [] });
  }

  const signTransaction = async () => {
    const signer = await getSigner();
    const res = await signer.signMessage(`Hello from Mellow-Finance!`);
    console.log("res", res);
    return res;
  };

  return {
    address,
    signTransaction,
    depositNativeCollateral,
    depositStableCollateral,
    // getMaxLoanAmount,
    requestLoan,
    repayLoan,
    releaseFunds,
    getLoanBalancewithInterest,
  };
};
