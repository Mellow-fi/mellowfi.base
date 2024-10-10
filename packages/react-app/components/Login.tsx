'use client';

import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push('/pool-list');
    }
  }, [address, router]);

  // if address redirect to pool-list
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            {/* Title with Yarn Image */}
      <div className="text-4xl font-semibold mb-8 text-gray-800 flex items-center space-x-1">
        <span>Mellow  M</span>
        <img src="../static/wool.png" alt="yarn" className="inline-block w-10 h-10" />
        <span>ney Magic</span>
      </div>

        <div>
          <Image src="/../static/login-image.png" alt="Cat Image" width={400} height={400}/>
        </div>

        {/* <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            className="border rounded p-2 mb-4 w-full"
          />
        </div> */}

        <div>
          {/* <button
            onClick={handleLogin}
            className="mt-4 px-7 py-2 bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            Login here
          </button> */}
          <ConnectButton
          
          />

          
        </div>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
