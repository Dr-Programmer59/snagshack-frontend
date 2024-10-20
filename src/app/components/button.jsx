"use client"


import React from 'react'

const Button = ({ name, onClick, customClass = "" }) => {


    return (
        <button className={`h-[36px] bg--white   font-bold font-jakarta tex-[15px] rounded-[8px] px-[15px] ${customClass}`} onClick={onClick}>
            {name}
        </button>
    )
}

export default Button;
