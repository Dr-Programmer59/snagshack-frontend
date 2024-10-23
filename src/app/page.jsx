"use client";

import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import ContentBox from "./components/content-box";
import Navbar from "@/app/components/navbar";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([])
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
