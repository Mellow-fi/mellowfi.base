import React, { useState } from 'react';

type DepositModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDepositCelo: (amount: number) => void;
  onDepositStableCoin: (amount: number) => void; // Add the second function
  title: string; // Add a title prop
};

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onDepositCelo, onDepositStableCoin, title }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleDeposit = () => {
    // Choose the function based on the title
    if (title === "Celo/cKES Pool") {
      onDepositCelo(amount);
    } else if (title === "USDT/cKES Pool") {
      onDepositStableCoin(amount);
    }
    onClose(); // Close the modal after deposit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={`Enter amount to deposit`}
          className="border rounded p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button className="mr-2 text-gray-500" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleDeposit}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
