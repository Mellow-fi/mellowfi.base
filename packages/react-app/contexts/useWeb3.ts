import { BrowserProvider, Contract, parseUnits } from "ethers";
import { useAccount, Config, useWriteContract, useReadContract } from "wagmi";
import {WriteContractMutate} from "wagmi/query";
import { useState, useEffect } from "react";
import StableTokenABI from "./cusd-abi.json";
import CollateralManagerABI from "./MellowFinanceCollateralManager.json";
import LoanManagerABI from "./MellowFinanceLoanManager.json"


export const useWeb3 = () => {
  const { address } = useAccount();
  const COLLATERAL_MANAGER_CONTRACT = "0x58E965DCc634f375cD01e695eBe73F1b217ee48c";
  const USDC_CONTRACT_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const LOAN_MANAGER_CONTRACT = "0xe538ab95d17B7875072D9a6ecC64419484Ec5Ae4";

  const {writeContract} = useWriteContract();

  

  const depositNativeCollateral = async (amount: string) => {
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

  const depositStableCollateral = async (amount: string) => {
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

  

  const requestLoan = async (amount: string) => {
    const amountInWei = parseUnits(amount, 6);

    try{

      // writeContract({
      //   abi: StableTokenABI.abi,
      //   address: USDC_CONTRACT_ADDRESS,
      //   functionName: "approve",
      //   args: [COLLATERAL_MANAGER_CONTRACT, amountInWei],
      // });


      const tx = writeContract({
        abi: LoanManagerABI.abi,
        address: LOAN_MANAGER_CONTRACT,
        functionName: "requestLoan",
        args:[amountInWei.toString()]
      });
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  }

  const repayLoan = async (amount: string) => {
    const amountInWei = parseUnits(amount, 6);
    
    try{

      writeContract({
        abi: StableTokenABI.abi,
        address: USDC_CONTRACT_ADDRESS,
        functionName: "approve",
        args: [LOAN_MANAGER_CONTRACT, amountInWei],
      });


      const tx = writeContract({
        abi: LoanManagerABI.abi,
        address: LOAN_MANAGER_CONTRACT,
        functionName: "repayLoan",
        args:[amountInWei.toString()]
      });
    } catch (e) {
      console.log(e);
    }
  }

  const repayFullLoan = async (amount: string) => {
    const amountInWei = parseUnits(amount, 6);
    
    try{

      writeContract({
        abi: StableTokenABI.abi,
        address: USDC_CONTRACT_ADDRESS,
        functionName: "approve",
        args: [LOAN_MANAGER_CONTRACT, ((Number(amountInWei)/1e6)+10)],
      });


      const tx = writeContract({
        abi: LoanManagerABI.abi,
        address: LOAN_MANAGER_CONTRACT,
        functionName: "repayLoan",
        args:[amount.toString()],
      });
    } catch (e) {
      console.log(e);
    }
  }


  return {
    address,
    depositNativeCollateral,
    depositStableCollateral,
    requestLoan,
    repayLoan,
    repayFullLoan,
  };
};
