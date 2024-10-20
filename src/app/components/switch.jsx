"use client";

import React from "react";
import { motion } from "framer-motion";

const PricingSwitch = ({ isMonthly, onToggle }) => {
    return (
        <div className="relative flex items-center bg-[#171717] p-1 w-[226px] h-[40px] rounded-[10px] font-inter text-[13px] ">
            <motion.div
                className="absolute top-1 left-3 w-[45%] h-[32px] bg-[#2B2B2B] rounded-[10px]"
                animate={{ x: isMonthly ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
                className={`w-1/2 z-10 text-center py-2 rounded-full transition-colors duration-300 ${isMonthly ? "text-white" : "text-white/50"
                    }`}
                onClick={onToggle}
            >
                Monthly
            </button>
            <button
                className={`w-1/2 z-10 text-center py-2 rounded-full transition-colors duration-300 ${isMonthly ? "text-white/50" : "text-white"
                    }`}
                onClick={onToggle}
            >
                Yearly
            </button>
        </div>
    );
};

export default PricingSwitch;
