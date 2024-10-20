import React from "react";
import Button from "./button";
import Pointer from "../../../public/pointer.png";
import Image from "next/image";

const details = [
    "Up to 2 uber eats accounts per day",
"Minimum of 2 $20 uber eats promos", 
"Access to full guides on how to place orders and get the most value ",
 "Some accounts have 2 $20 off promos some have 2 $25 off some $30 promos"
];

const PricingCard = ({ name, price, duration, buttonCustomClass = "", customClass = "" }) => {
    return (
        <div
            className={`flex flex-col items-center w-full max-w-[400px] min-w-[300px] h-[415px] text-white px-[30px] pl-[40px] py-[50px] rounded-[20px] border  bg-[#171717] hover:cursor-pointer ${name === 'Pro' ? 'border-primary' : 'border-white/10'} ${customClass}`}
        >
            <p className="font-inter font-medium text-[18px] text-left w-full">{name}</p>

            <p className="flex flex-row items-center gap-x-[5px] w-full">
                <span className="font-ginto text-[45px] font-bold text-white">${price}</span>
                <span className="font-inter text-[16px] text-white/70 h-auto mt-[25px]">
                    / per {duration}
                </span>
            </p>

            <Button
                name="Purchase"
                customClass={`font-inter font-semibold text-[15px] w-full py-[10px] my-[5px] ${buttonCustomClass}`}
            />

            <hr className="w-full border border-white/10 my-4" />

            <ol className="w-full">
                {details.map((detail, index) => (
                    <li key={index} className="flex flex-row items-center font-inter font-medium text-[15px] my-2 tracking-wide">
                        <Image src={Pointer} alt="pointer" height="15" width="15" className="mr-[10px]" />
                        {detail}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default PricingCard;
