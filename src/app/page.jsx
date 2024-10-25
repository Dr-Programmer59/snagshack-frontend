"use client";

import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import ContentBox from "./components/content-box";
import Navbar from "@/app/components/navbar";
const greetingMessage = (
  <div className="text-white text-base leading-relaxed">
    <p className="font-bold text-lg">👋 Welcome to SnagShack Bot!</p>
    <p>We are here to assist you. Use the following commands to get started:</p>
    <ul className="list-disc pl-6">
      <li><strong>FOOD</strong> : to get your coupon account 🍔</li>
      <li><strong>OTP &lt;email&gt;</strong> : to get OTP for specific email. Example: <strong>OTP xyz@snagshack.shop</strong> ✉️</li>
      <li><strong>GUIDE</strong> : to get a proper GUIDE on how you can get offers, etc. 📖</li>
      <li><strong>VCC</strong> : Simply type “VCC” to receive a complete guide on where and how to get a Virtual Credit Card.</li>
    
    </ul>
  </div>
);
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{"role":"bot",msg:greetingMessage}])
  const [inputValue, setinputValue] = useState("")
 

  return (
    <div className="flex flex-row hide-scrollbar">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  />

      <div className={`flex flex-col w-full ml-[260px] md:ml-0 transition-all duration-300 hide-scrollbar`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen}  messages={messages} setMessages={setMessages} setinputValue={setinputValue} inputValue={inputValue}/>
        <ContentBox messages={messages} setMessages={setMessages} setinputValue={setinputValue} inputValue={inputValue}  />
      </div>
    </div>
  );
};

export default Page;
