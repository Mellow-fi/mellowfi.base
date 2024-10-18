// File: BlueCreateWalletButton.tsx  
import React, { useCallback } from 'react';  
import { useConnect } from 'wagmi';  
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';   

const buttonStyles: React.CSSProperties = {
  background: '#FFD700', // Yellow background
  border: '2px solid #D3D3D3', // Light gray border
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 180, // Adjusted width to match the image
  height: 40, 
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: 16,
  color: 'white', 
  textAlign: 'center',
  borderRadius: 20, // More rounded corners
  padding: '5px 20px', 
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Subtle shadow
};

  
 

export function BlueCreateWalletButton() {  
  const { connectors, connect } = useConnect();  

  const createWallet = useCallback(() => {  
    const coinbaseWalletConnector = connectors.find(  
      (connector) => connector.id === 'coinbaseWalletSDK'  
    );  
    if (coinbaseWalletConnector) {  
      connect({ connector: coinbaseWalletConnector });  
    }  
  }, [connectors, connect]);  

  return (  
    <button style={buttonStyles} onClick={createWallet}>  
      <CoinbaseWalletLogo />  
      Create Wallet  
    </button>  
  );  
}