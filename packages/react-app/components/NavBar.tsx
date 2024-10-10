import React from 'react';
import { useRouter } from 'next/router'; 
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {  BlueCreateWalletButton } from './BlueCreateWalletButton'; // Import the button

const Navbar: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleSuccess = (address: string) => {
    console.log('Wallet created:', address);
    // You can add additional logic here (e.g., update state, redirect, etc.)
  };

  const handleError = (error: any) => {
    console.error('Error creating wallet:', error);
  };

  return (
    <nav className="bg-white text-gray-800 px-4 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('/')}>
          Mellow Finance
        </div>
        <ConnectButton />

        {/* Create Wallet Button */}
        < BlueCreateWalletButton  />
      </div>
    </nav>
  );
};

export default Navbar; 
