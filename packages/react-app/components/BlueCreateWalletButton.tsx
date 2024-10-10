// File: BlueCreateWalletButton.tsx  
import React, { useCallback } from 'react';  
import { useConnect } from 'wagmi';  
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';   

const buttonStyles: React.CSSProperties = {
    background: 'linear-gradient(90deg, #007BFF, #0052FF)', 
    border: 'none', 
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    width: 200,
    height: 40, 
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: 16, 
    color: '#fffffZ', 
    borderRadius: 12, 
    padding: '10px 20px', 
    cursor: 'pointer', 
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0, 82, 255, 0.3)', 
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