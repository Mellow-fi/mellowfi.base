import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/useWeb3';  
import Navbar from './NavBar';
import Footer from './Footer';
import { useRouter } from 'next/router'; 
import { useReadContract, useAccount,useWriteContract } from 'wagmi';
import LoanManagerABI from '../contexts/MellowFinanceLoanManager.json';
import { writeContract } from 'viem/actions';

interface LoanData {
  loanAmount: number;
  collateralAmount: number;
  loanToValueRatio: number;
  isSufficientlyCollateralized: boolean;
}

const LoanDashboard: React.FC = () => {
  const { isError, isPending ,writeContract, error } = useWriteContract();  const [desiredLoanAmount, setDesiredLoanAmount] = useState('');
  const address = useAccount().address;

  const { data: collinUSD } = useReadContract({
    abi: LoanManagerABI.abi,
    address: '0x23386834A7D36FC173A16B8dc8dA92c648AA340f',
    functionName: 'getCollinUSD',
    args: [address],
  });

  console.log(collinUSD);
  const availableloan = (Number(collinUSD) * 150 / 100).toString();
  const availableloanFloat = parseFloat(availableloan);
  const formattedavailableloanFloat = (availableloanFloat / 1e18).toFixed(2);
  const mxLoanStr = Number(collinUSD).toString();
  const mxLoanFloat = parseFloat(mxLoanStr);
  const formattedLoanAmount = (mxLoanFloat / 1e18).toFixed(2); 

  console.log(formattedLoanAmount);
  const router = useRouter(); 

  const handleBorrowLoan = async (amount:number) => {

    // Logic to borrow the loan
    await requestLoan(desiredLoanAmount,writeContract);
    console.log(`Borrowing loan amount:${desiredLoanAmount}`);
  };

  const handleRepayLoan = async () => {
    // Logic to repay the loan
  };

  const handleBack = () => {
    router.back();
  };

  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredLoanAmount(event.target.value);
  };

  const handleLoanSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleBorrowLoan();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar handleBack={handleBack} />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex-grow max-w-4xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Loan Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Your Loan</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><strong>Available Loan Amount:</strong> ${formattedavailableloanFloat}</p>
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
                <strong>Loan Taken:</strong> ${}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleRepayLoan}
                  className="w-50 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                >
                  Repay Loan
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar: React.FC<{ handleBack: () => void }> = ({ handleBack }) => {
  return (
    <div className="w-64 bg-gray-600 text-white p-6 space-y-6 h-screen ">
      <h2 className="text-xl font-bold">Navigation</h2>
      <nav className="space-y-4">
        <button
          onClick={handleBack}
          className="block w-full text-left bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 mt-60 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-gray-300 text-sm"
        >
          Back to Pool List
        </button>
      </nav>
    </div>
  );
};

export default LoanDashboard;