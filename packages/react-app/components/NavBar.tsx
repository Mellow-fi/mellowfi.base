import React from 'react';
import { useRouter } from 'next/router'; 
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BlueCreateWalletButton } from './BlueCreateWalletButton'; // Import the button
import { useAccount } from 'wagmi'; // Import useAccount hook from wagmi

const Navbar: React.FC = () => {
  const router = useRouter();
  const { isConnected } = useAccount(); // Destructure isConnected to check wallet status

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

        {/* Wallet Connect Button */}
        <ConnectButton />

        {/* Conditionally render the Create Wallet Button if not connected */}
        {!isConnected && <BlueCreateWalletButton />}
      </div>
    </nav>
  );
};

export default Navbar;
