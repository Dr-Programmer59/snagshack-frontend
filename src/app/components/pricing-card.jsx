'use client'
import React from "react";
import Button from "./button";
import Pointer from "../../../public/pointer.png";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import { useSelector } from 'react-redux';
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const details = [
    "Unlock up to 2 exclusive accounts each day!",
"Each account comes with double savings: at least two $20 off promos, and some accounts surprise you with $25 or even $30 promos!", 
"Access to full guides on how to place orders and get the most value ",
"Accounts surprise you with $25 or even $30 promos!", 
"Enjoy over $80 in daily savings — that’s serious value!",
 "Stack up to $2,400 or more in monthly savings!"
];

const PricingCard = ({ name, price, duration, buttonCustomClass = "", customClass = "" }) => {
    const { user } = useSelector(store => store.userReducer);
    const productId=process.env.STRIP_PRICE_KEY
    console.log(productId)
    return (
        <div
            className={`flex flex-col items-center w-full max-w-[400px] min-w-[300px] h-[610px] text-white px-[30px] pl-[40px] py-[50px] rounded-[20px] border  bg-[#171717] hover:cursor-pointer ${name === 'Pro' ? 'border-primary' : 'border-white/10'} ${customClass}`}
        >
            {name!="Coming Soon"?
            <>
            <p className="font-inter font-medium text-[18px] text-left w-full">{name}</p>

               <p className="flex flex-row items-center gap-x-[5px] w-full">
               <span className="font-ginto text-[45px] font-bold text-white">${price}</span>
               <span className="font-inter text-[16px] text-white/70 h-auto mt-[25px]">
                   / per {duration}
               </span>
           </p>
                
           <CheckoutButton productId={"price_1QCDvX1OGUJyl9WfkdBzx9io"} />
            


           <hr className="w-full border border-white/10 my-4" />

           <ol className="w-full">
               {details.map((detail, index) => (
                   <li key={index} className="flex flex-row items-center font-inter font-medium text-[15px] my-2 tracking-wide">
                       <Image src={Pointer} alt="pointer" height="15" width="15" className="mr-[10px]" />
                       {detail}
                   </li>
               ))}
           </ol>
           </>:
           <div className="flex flex-col justify-center items-center self-center">
             <p className="font-inter font-medium text-[40px] text-left w-full">{name}</p>
            </div>
        }
         
        </div>
    );
};

export default PricingCard;
