import React from 'react'

const Heading = ({ text, customClass = '' }) => {
    return (
        <p className={`font-ginto font-bold text-[35px] text-center text-white q-full  ${customClass}`}>
            {text}
        </p>
    )
}

export default Heading
