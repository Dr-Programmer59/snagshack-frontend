import React from 'react'
import Image from 'next/image'


const HeaderSuggestionCard = ({ imgPath, title }) => {
    return (
        <div className='flex flex-row w-auto  min-w-[182px] border border-white/30 rounded-[10px] py-3 px-2 gap-x-2 hover:cursor-pointer h-[42px] items-center'>
            <Image src={imgPath} alt='logo' className='mr-2 h-[25px] w-[25px]' />
            <span className='font-inter text-[14px] font-semibold text-white w-full'>{title}</span>
        </div>
    )
}

export default HeaderSuggestionCard
