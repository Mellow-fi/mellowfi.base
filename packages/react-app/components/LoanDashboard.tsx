import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/useWeb3';  
import Navbar from './NavBar';
import Footer from './Footer';
import { useRouter } from 'next/router'; 
import { useReadContract, useAccount, useWriteContract } from 'wagmi';
import LoanManagerABI from '../contexts/MellowFinanceLoanManager.json';
import { updatePassword } from 'firebase/auth';

const LOAN_MANAGER_ADDRESS = '0xe538ab95d17B7875072D9a6ecC64419484Ec5Ae4';

const LoanDashboard: React.FC = () => {
  const { requestLoan, repayLoan, repayFullLoan, ApproveContract } = useWeb3();
  const { isError, isPending, writeContract, error, isSuccess } = useWriteContract();  
  const [desiredLoanAmount, setDesiredLoanAmount] = useState('');
  const address = useAccount().address;
  const router = useRouter(); 

  const { data: collinUSD } = useReadContract({
    abi: LoanManagerABI.abi,
    address: LOAN_MANAGER_ADDRESS,
    functionName: 'getCollinUSD',
    args: [address],
  });

  const { data: loanWithInterest } = useReadContract({
    abi: LoanManagerABI.abi,
    address: LOAN_MANAGER_ADDRESS,
    functionName: 'calculateLoanWithInterest',
    args: [address],
  });

  const availableloan = (Number(collinUSD) * 100 / 150).toString();
  const availableloanFloat = parseFloat(availableloan);
  const formattedavailableloanFloat = (availableloanFloat / 1e18).toFixed(2);
  const mxLoanStr = Number(collinUSD).toString();
  const mxLoanFloat = parseFloat(mxLoanStr);
  const formattedLoanAmount = (mxLoanFloat / 1e18).toFixed(2); 
  const formattedLoanwithInterestAmount = (Number(loanWithInterest) / 1e6).toFixed(2);
  const totalAvailableLoan = (Number(formattedavailableloanFloat) - Number(formattedLoanwithInterestAmount)).toFixed(2);

  const handleBorrowLoan = async (amount: number) => {
    try {
      await requestLoan(amount.toString());
      if (!isError) console.log("Loan requested: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepayLoan = async () => {
    try {
      const amount = formattedLoanwithInterestAmount;
      await repayLoan(amount.toString());
      if (!isError) console.log("Loan repaid: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepayFullLoan = async () => {
    // Logic to repay the loan
    const amount = Number(loanWithInterest);
    const updatedAmount = amount + 10;
    try {
      console.log(`You need to pay: ${amount}`);
      console.log(`You will pay: ${updatedAmount} `)
      await ApproveContract(updatedAmount.toString());
      await repayFullLoan(updatedAmount.toString());
      // if (!isError) console.log("Loan repaid: ", amount);
      // if(isSuccess) {
      //   console.log("Loan repaid successfully");
      // } else {
      //   console.log("Loan not repaid");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredLoanAmount(event.target.value);
  };

  const handleLoanSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleBorrowLoan(Number(desiredLoanAmount));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto p-6">
        
        {/* Back Button */}
        

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Loan Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Your Loan</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>Available Loan Amount:</strong> ${totalAvailableLoan}</p>
              <p><strong>Collateral Amount:</strong> ${formattedLoanAmount}</p>
              <form onSubmit={handleLoanSubmit} className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Desired Loan Amount:
                </label>
                <input
                  type="number"
                  value={desiredLoanAmount}
                  onChange={handleLoanAmountChange}
                  placeholder="Enter amount"
                  className="w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  Borrow Loan
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Repay Loan</h3>
            <p className="text-gray-700 text-sm">
              <strong>Loan Taken:</strong> ${formattedLoanwithInterestAmount}
            </p>
            <div className="mt-4">
              <button
                onClick={handleRepayFullLoan}
                className="w-50 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
              >
                Repay Loan
              </button>
            </div>
            
          </div>
        </div>
        <button
          onClick={handleBack}
          className="mb-6 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
        >
          Back to Pool List
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LoanDashboard;
