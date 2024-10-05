import React from 'react';
import { useRouter } from "next/router";

const LandingPage = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/Login');
    };

    return (
        <div className="min-h-screen bg-yellow-50 flex justify-center items-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Left Section */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Credit Made Easy</h1>
                    <p className="text-lg text-gray-600 mb-8">Mellow Finance</p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-yellow-400 delay-500 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded">
                        Get Started
                    </button>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 md:mt-8 md:mt-0  flex justify-center">
                    <div className="relative">
                        <img
                            src="../static/cat.png"
                            alt="Phone displaying Mellow Finance"
                            className="max-w-xs md:max-w-[300px] w-[200px] shadow-xl custom-shadow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
