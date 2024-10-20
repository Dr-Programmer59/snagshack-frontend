import Image from 'next/image'

const SuggestionCard = ({ imgPath, title, description }) => {
    return (
        <div className='flex flex-row w-full max-w-[431px] min-w-[250px] border border-white/30 rounded-[10px] py-3 pl-2 gap-x-2 hover:cursor-pointer'>

            <Image src={imgPath} alt='logo' height="17" width="30" className='mr-2' />

            <div className='flex flex-col '>
                <span className='font-inter text-[14px] font-semibold text-white w-full'>{title}</span>
                <span className='font-inter text-[11px] text-white/60 w-full'>{description}</span>
            </div>

        </div>
    )
}

export default SuggestionCard
