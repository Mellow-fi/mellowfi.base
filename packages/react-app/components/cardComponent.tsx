
import React, { useState, useEffect } from 'react';
import DepositModal from './DepositModal';
import { useWeb3 } from '@/contexts/useWeb3';

type CardProps = {
  title: string;
  interestRate: number;
  imageUrl: string;
};

const CardComponent: React.FC<CardProps> = ({ title, interestRate, imageUrl }) => {

  const { address,depositCeloCollateral,depositUsdtCollateral } = useWeb3();
  useEffect(() => {
    setUserAddress(address ?? null);
  }, [address]); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [uAddress, setUserAddress] = useState<string | null>(address ?? null); // Set the user address
  
  const handleDepositCeloCollateral = async (amount: number) => {
    try {
      const tx = await depositCeloCollateral(amount.toString());
      
      console.log("Celo collateral deposited: ", amount);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDepositCEURCollateral = async (amount: number) => {
    try {
      const tx = await depositUsdtCollateral(amount.toString());
      
      console.log("USDT collateral deposited: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBorrowClick = () => {
    setIsModalOpen(true); 
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white mb-6">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">Interest rate: {interestRate}%</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleBorrowClick} 
        >
          Borrow
        </button>
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
