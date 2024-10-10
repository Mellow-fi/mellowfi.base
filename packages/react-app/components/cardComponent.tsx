import React, { useState, useEffect } from 'react';
import DepositModal from './DepositModal';
import { useWeb3 } from '@/contexts/useWeb3';

type CardProps = {
  title: string;
  interestRate: number;
  imageUrl: string;
  redirectToLoanDashboard: () => void; // Add this prop
};

const CardComponent: React.FC<CardProps> = ({ title, interestRate, imageUrl, redirectToLoanDashboard }) => {
  const { address, depositNativeCollateral, depositStableCollateral } = useWeb3();

  useEffect(() => {
    setUserAddress(address ?? null);
  }, [address]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uAddress, setUserAddress] = useState<string | null>(address ?? null); // Set the user address
  
  const handleDepositCeloCollateral = async (amount: number) => {
    try {
      await depositNativeCollateral(amount.toString());
      console.log("Celo collateral deposited: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepositCEURCollateral = async (amount: number) => {
    try {
      await depositStableCollateral(amount.toString());
      console.log("USDT collateral deposited: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBorrowClick = () => {
    setIsModalOpen(true); 
  };

  return (
    <div className="max-w-lg w-full rounded-lg overflow-hidden shadow-lg bg-white mb-6 flex flex-col"> {/* Adjusted width */}
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" /> {/* Increased height */}
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">Interest rate: {interestRate}%</p>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleBorrowClick} 
          >
            Borrow
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded"
            onClick={redirectToLoanDashboard} // Use the prop
          >
            Go to Loan Dashboard
          </button>
        </div>
      </div>
      <DepositModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onDepositCelo={handleDepositCeloCollateral}
        onDepositStableCoin={handleDepositCEURCollateral} 
        title={title} 
      />
    </div>
  );
};

export default CardComponent;
