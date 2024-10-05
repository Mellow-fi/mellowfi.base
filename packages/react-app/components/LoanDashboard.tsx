import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/useWeb3';  
import Navbar from './NavBar';
import Footer from './Footer';
import { useRouter } from 'next/router'; 

interface LoanData {
  loanAmount: number;
  collateralAmount: number;
  loanToValueRatio: number;
  isSufficientlyCollateralized: boolean;
}

const LoanDashboard: React.FC = () => {
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const { getMaxLoanAmount, getCollateralBalanceinUSD, requestLoan, repayLoan, getLoanBalancewithInterest } = useWeb3();
  const router = useRouter(); 

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const maxLoanAmount = await getMaxLoanAmount();
        const mxLoanStr = maxLoanAmount.toString();
        const mxLoanFloat = parseFloat(mxLoanStr);
        const formattedLoanAmount = (mxLoanFloat / Math.pow(10, 8)).toFixed(4); // Adjust precision as needed
        const uCollat = await getCollateralBalanceinUSD();
        const uCollatStr = uCollat.toString();
        const uCollatFloat = parseFloat(uCollatStr);
        const formattedCollateralAmount = (uCollatFloat / Math.pow(10, 8)).toFixed(4); // Adjust precision as needed
        const updatedLoanData: LoanData = {
          loanAmount: parseFloat(formattedLoanAmount), 
          collateralAmount: parseFloat(formattedCollateralAmount), 
          loanToValueRatio: 1.5,  
          isSufficientlyCollateralized: true,
        };
        setLoanData(updatedLoanData);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    };
    fetchLoanData();
  }, [getMaxLoanAmount, getCollateralBalanceinUSD]);



  const [borrowAmount, setBorrowAmount] = useState<string>("");

  const getLoanBalance = async () => {
    try {
      const loanBalance = await getLoanBalancewithInterest();
      return loanBalance;
    } catch (error) {
      console.error("Error fetching loan balance:", error);
    }
  }
    

  const handleBorrowLoan = async () => {
    try {
      if (loanData) {
        const loanAmountStr = loanData.loanAmount.toString();
        const loanAmountFloat = parseInt(loanAmountStr);
        const loanAmountInWei = (loanAmountFloat);
        const reducedLoanAmountInWei = (loanAmountInWei).toString();
        console.log(loanAmountInWei);
        await requestLoan(reducedLoanAmountInWei);
        
        alert("Loan request successful!");
      } else {
        console.error("Loan data is null.");
      }
    } catch (error) {
      console.error("Error borrowing loan:", error);
      alert("Error borrowing loan. Please try again.");
    }
  };

  const handleLoanwithValue = async () => {
    try{
      if (borrowAmount) {
        const loanAmountInWei = (parseFloat(borrowAmount)).toString();
        console.log(loanAmountInWei);
        await requestLoan(loanAmountInWei);
        alert("Loan request successful!");
      }
    }
    catch (error) {
      console.error("Error borrowing loan:", error);
      alert("Error borrowing loan. Please try again.");
    }
  }

  const handleRepayLoan = async () => {
    try {
      if (loanData) {
        await repayLoan(loanData.loanAmount.toString());
        alert("Loan repayment successful!");
      } else {
        console.error("Loan data is null.");
      }
    } catch (error) {
      console.error("Error repaying loan:", error);
      alert("Error repaying loan. Please try again.");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Loan Dashboard</h2>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Your Loan</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>Available Loan Amount:</strong> ${loanData?.collateralAmount?.toLocaleString()}</p>
              <p><strong>Collateral Amount:</strong> ${loanData?.loanAmount.toLocaleString()}</p>
              <p><strong>Loan-to-Value (LTV) Ratio:</strong> {loanData?.loanToValueRatio ? loanData.loanToValueRatio * 100 : 0}%</p>
              <p><strong>Collateralization Status:</strong>
                {loanData?.isSufficientlyCollateralized ? (
                  <span className="text-green-600 font-bold"> Sufficient</span>
                ) : (
                  <span className="text-red-600 font-bold"> Insufficient</span>
                )}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={handleBorrowLoan}
                className="w-50 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              >
                Borrow Loan
              </button>
            </div>
          </div>

         
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Enter Loan Amount</h3>
            <div className="mt-4">
              <label htmlFor="borrowAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Loan Amount:
              </label>
              <input
                type="number"
                id="borrowAmount"
                value={borrowAmount ?? ""}
                onChange={(e) => setBorrowAmount(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                placeholder="Enter loan amount you want to borrow"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleLoanwithValue}
                className="w-50 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              >
                Submit Borrow Loan
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Repay Loan</h3>
          <p className="text-gray-700 text-sm">
            <strong>Loan Taken:</strong> ${getLoanBalance()}
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

       
        <div className="mt-8">
          <button
            onClick={handleBorrowLoan}
            className="w-50 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
          >
            Withdraw Collateral
          </button>
        </div>

       
        <div className="mt-8">
          <button
            onClick={handleBack}
            className="w-50 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
          >
            Back to Pool List
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanDashboard;
