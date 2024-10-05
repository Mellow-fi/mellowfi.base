'use client';

import React, { useState } from "react";
import { auth } from "./firebase"; // Ensure this path is correct
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Image from "next/image";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLoginWithoutEmail = () => {
    router.push('/pool-list');
  };

  const handleLogin = async () => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/pool-list',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setMessage(`Check your email for the login link!`);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="text-3xl font-semibold mb-4 text-gray-800 flex items-center">
          <h1>Mellow  M<span className="text-yellow-400 mx-1 text-6xl">o</span>ney Magic!</h1>
        </div>

        <div>
          <Image src="/../static/login-image.png" alt="Cat Image" width={400} height={400}/>
        </div>

        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            className="border rounded p-2 mb-4 w-full"
          />
        </div>

        <div>
          <button
            onClick={handleLogin}
            className="mt-4 px-7 py-2 bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            Login here
          </button>

          
        </div>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
