import React from 'react';
import { useRouter } from 'next/router'; 
import CardComponent from './cardComponent';
import Navbar from './NavBar';
import Footer from './Footer';

const PoolList: React.FC = () => {
  const router = useRouter(); 

  const pools = [
    {
      title: 'Celo/cKES Pool',
      interestRate: 8,
      imageUrl: '../static/cardImage.png',
    },
    {
      title: 'USDT/cKES Pool',
      interestRate: 8,
      imageUrl: '../static/secondCardImage.png',
    },
  ];

  
  const redirectToLoanDashboard = () => {
    router.push('/Loandashboard'); 
  };

  return (
    <div>
    <div >   
      <Navbar />
      
    </div>

    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Mellow</h1>
      {pools.map((pool, index) => (
        <CardComponent
          key={index}
          title={pool.title}
          interestRate={pool.interestRate}
          imageUrl={pool.imageUrl}
        />
      ))}

      {/* Add the button to redirect to LoanDashboard */}
      <button
        onClick={redirectToLoanDashboard}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
      >
        Go to Loan Dashboard
      </button>
    </div>
    <Footer />
    </div>
  );
};

export default PoolList;
