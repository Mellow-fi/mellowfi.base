
import React, { useState, useEffect } from 'react';
import DepositModal from './DepositModal';
import { useWeb3 } from '@/contexts/useWeb3';
import { useWriteContract } from 'wagmi';

type CardProps = {
  title: string;
  interestRate: number;
  imageUrl: string;
};

const CardComponent: React.FC<CardProps> = ({ title, interestRate, imageUrl }) => {
  const { isError, isPending ,writeContract, error } = useWriteContract();

  const { address,depositNativeCollateral,depositStableCollateral } = useWeb3();
  useEffect(() => {
    setUserAddress(address ?? null);
  }, [address]); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [uAddress, setUserAddress] = useState<string | null>(address ?? null); // Set the user address
  
  const handleDepositCeloCollateral = async (amount: number) => {
    try {
      await depositNativeCollateral(amount.toString(), writeContract);
      
      console.log("Native collateral deposited: ", amount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepositNativeCollateral = async (amount: number) => {
    try {
      await depositStableCollateral(amount.toString(), writeContract);

      // console.log(isError)
      // console.log(isPending)
      // console.log(error);
      
      // if (!isError)console.log("USDT collateral deposited: ", amount);
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
        onDepositStableCoin={handleDepositNativeCollateral} 
        title={title} 
      />
    </div>
  );
};

export default CardComponent;
