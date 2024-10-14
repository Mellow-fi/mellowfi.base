import React from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import Footer from './Footer';

const LandingPage = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/Login');
    };

    return (
        <div>
        <div className="min-h-screen bg-yellow-50 flex flex-col justify-center items-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Left Section */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="font-serif text-7xl font-bold text-gray-800 mb-4">Credit Made Easy</h1>
                    <p className="font-serif text-lg text-gray-600 mb-8">Mellow Finance</p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded transition duration-300">
                        Get Started
                    </button>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 mt-8 flex justify-center">
                    <div className="relative">
                        <Image
                            src="/../static/mellow.png"
                            alt="Phone displaying Mellow Finance"
                            className="max-w-xs md:max-w-[1200px] w-[500px]"
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="mt-16 py-12 bg-white w-full">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-serif font-bold text-gray-800 mb-8">About Us</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                        Welcome to <span className="font-semibold text-yellow-500">Mellow Finance</span>, your trusted partner in decentralized lending. We make borrowing simple, secure, and transparent by leveraging blockchain technology. 
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                        Our mission is to offer a user-friendly platform that allows you to deposit your crypto assets and receive loans with ease. Whether you are looking to make a major purchase or manage your finances, we’ve got you covered. 
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        With Mellow Finance, borrowing is as easy as depositing your crypto, getting your loan, and repaying when ready. All while ensuring the safety of your assets through smart contracts.
                    </p>
                </div>
            </div>
        </div>

        <Footer />
        </div>
    );
};

export default LandingPage;
