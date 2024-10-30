import React from 'react'

const Heading = ({ text, customClass = '' }) => {
    return (
        <p className={`font-ginto font-bold text-[35px] lg:text-[27px] text-center text-white q-full  ${customClass}`}>
            {text}
        </p>
    )
}

export default Heading
