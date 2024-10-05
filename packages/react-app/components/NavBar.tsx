import React from 'react';
import { useRouter } from 'next/router'; 
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-white text-gray-800 px-4 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigateTo('/')}>
          Mellow Finance
        </div>

        {/* Connect Wallet Button */}
        <div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
