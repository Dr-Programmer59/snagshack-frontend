import React from 'react'

const Text = ({ content, customClass }) => {
    return (
        <p className={`font-inter text-white/60 w-full max-w-274px leading-[18px] text-[17px]  ${customClass}`}>
            {content}
        </p>
    )
}

export default Text
