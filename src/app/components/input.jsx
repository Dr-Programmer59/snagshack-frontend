import { EDGE_UNSUPPORTED_NODE_APIS } from 'next/dist/shared/lib/constants'
import React from 'react'

const Input = () => {
    return (
        <div className="flex items-center space-x-2 bg-foreground p-2 rounded-[100px] max-w-[896px] w-full h-[57px]">
            <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
            </svg>
            <input
                type="text"
                placeholder="Begin by typing here..."
                className="flex-grow bg-transparent border-none placeholder:text-white/40 text-white focus:outline-none font-inter text-[15px] font-medium"
            />
            <button className="bg-primary hover:bg-primary/80 rounded-full p-2 focus:outline-none">
                <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </div>
    )
}

export default Input;