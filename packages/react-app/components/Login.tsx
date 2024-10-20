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
    <div className="bg-zinc-800">
      <Navbar />
      <div className="min-h-screen bg-zinc-800 flex flex-col justify-center items-center">
            {/* Title with Yarn Image */}
      <div className="text-4xl font-san-serif font-semibold mb-8 text-white flex items-center space-x-1">
        <span>Mellow  M</span>
        <Image src="/static/wool.png" alt="yarn" className="inline-block w-10 h-10" width={10} height={10} />
        <span>ney Magic</span>
      </div>

        <div>
          <Image src="/static/login-image.png.png" alt="Cat Image" width={400} height={400}/>
        </div>

        {/* <div>
          <input
            type="email"
            placeholder="Your Email"MY DUKA ( e-commerce website)

Problem Statement:
Online shopping can often be complex for both customers and retailers. Customers may face difficulties navigating through websites, comparing products, and managing their orders efficiently. Retailers, on the other hand, struggle with managing inventory, processing payments, and ensuring a seamless customer experience. Building an intuitive and scalable e-commerce platform is essential to streamline these processes and improve user satisfaction.
Solution Overview:
This e-commerce website will provide a user-friendly platform where customers can easily browse through products, add items to their shopping cart, and proceed with a secure checkout process. It will enable businesses to manage their inventory, monitor sales, and handle customer orders efficiently through an admin dashboard. The system will ensure a smooth and secure shopping experience from product discovery to order fulfillment.
Minimum Viable Products (MVPs):
Product Browsing Interface for Users
Allow users to browse product categories and search for items based on filters like price, rating, or brand.
Display product details, images, and customer reviews to aid purchasing decisions.
Provide a seamless product comparison option to help users make informed choices.

Shopping Cart and Wishlist
Enable users to add items to their shopping cart or wishlist for future purchases.
Display cart contents with the ability to update quantities, remove items, or save for later.
Offer real-time price updates based on promotions or discounts applied.


User Authentication and Profile Management
Allow users to sign up, log in, and manage their accounts securely.
Store user order history, shipping details, and payment preferences to streamline future purchases.
Enable guest checkout for users who prefer to make purchases without registering.

Order Management and Tracking
Provide users with the ability to track their order status in real-time from the dashboard.
Allow customers to view past orders, request returns or refunds, and communicate with support if needed.
Technology Stack:
Frontend:
React for building dynamic user interfaces.
Tailwind CSS for responsive and modern styling.
Backend:
Node.js with Express for handling API requests and managing business logic.
Firebase Authentication for secure user authentication.
Database:
Sqllite for storing product data, user information, and order details.
API:
Custom-built RESTful API for handling communication between the frontend and the backend

Links
slides




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
