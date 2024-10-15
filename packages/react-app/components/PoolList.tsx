import React from 'react';
import { useRouter } from 'next/router'; 
import CardComponent from './cardComponent';
import Navbar from './NavBar';
import Footer from './Footer';

const PoolList: React.FC = () => {
  const router = useRouter(); 

  const pools = [
    {
      title: 'BASE/cKES Pool',
      interestRate: 8,
      imageUrl: '/../static/cardImage.png',
    },
    {
      title: 'USDT/cKES Pool',
      interestRate: 8,
      imageUrl: '/../static/secondCardImage.png',
    },
  ];

  const redirectToLoanDashboard = () => {
    router.push('/Loandashboard'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="p-6 flex flex-col items-center flex-grow">
        <h1 className="text-2xl font-semibold mb-6">Mellow</h1>

        {/* Grid container for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {pools.map((pool, index) => (
            <CardComponent
              key={index}
              title={pool.title}
              interestRate={pool.interestRate}
              imageUrl={pool.imageUrl}
              redirectToLoanDashboard={redirectToLoanDashboard} // Pass down the redirect function
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PoolList;
