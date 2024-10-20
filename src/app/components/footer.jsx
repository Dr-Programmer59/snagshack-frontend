import React from 'react'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import Text from '../components/text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='flex flex-col w-full h-auto justify-between  py-[40px] bg-foreground text-white'>
            <div className='flex flex-row justify-between flex-wrap px-[30px]'>

                <span className=' max-w-[300px] sm:max-w-full '>
                    {/* Logo and name */}
                    <span className="flex flex-row items-center w-full  mb-2">
                        <Image src={Logo} alt="logo" className="h-[52px] w-[52px] md:h-[36px] md:w-[36px]" />
                        <p className="font-ginto text-[17px] font-bold leading-[18px] ml-2">SnagBot</p>
                    </span>
                    <Text content="Lorem ipsum dolor set amet consectetur " customClass="font-inter text-[17px] w-full max-w-[222px] text-left sm:max-w-full" />
                </span>

                <span className='w-full max-w-[260px] flex flex-col gap-y-1 sm:max-w-[220px]'>
                    <span className='font-inter text-[16px] text-white font-medium my-2'>Menu</span>
                    <span className='flex justify-between flex-wrap gap-2'>
                        <a className='font-inter font-medium text-[16px] text-white/50'>Features</a>
                        <a className='font-inter font-medium text-[16px] text-white/50'>Benefits</a>
                        <a className='font-inter font-medium text-[16px] text-white/50'>Pricing</a>
                        <a className='font-inter font-medium text-[16px] text-white/50'>FAQ</a>

                    </span>
                </span>
                <span className='w-full max-w-[200px] flex flex-col gap-y-3 sm:max-w-full'>
                    <span className='font-inter text-[16px] text-white font-medium my-2'></span>
                    <span className='flex justify-end mt-[20px] md:hidden'>
                        <a href='#' rel='noopener noreferrer' className='mx-2'>
                            <FontAwesomeIcon icon={faFacebook} size='lg' />
                        </a>
                        <a href='#' rel='noopener noreferrer' className='mx-2'>
                            <FontAwesomeIcon icon={faInstagram} size='lg' />
                        </a>
                        <a href='#' rel='noopener noreferrer' className='mx-2'>
                            <FontAwesomeIcon icon={faXTwitter} size='lg' />
                        </a>
                    </span>
                </span>
            </div>
            <hr className='border border-white/10 my-[20px]' />
            <div className='px-[30px] md:px-[10px] md:flex md:flex-row md:justify-between'>
                <p className='w-full text-left font-inter font-medium text-[16px] text-white/50'>All rights reserved.</p>

                <span className='md:flex justify-end mt-[20px] hidden '>
                    <a href='#' rel='noopener noreferrer' className='mx-2'>
                        <FontAwesomeIcon icon={faFacebook} size='lg' />
                    </a>
                    <a href='#' rel='noopener noreferrer' className='mx-2'>
                        <FontAwesomeIcon icon={faInstagram} size='lg' />
                    </a>
                    <a href='#' rel='noopener noreferrer' className='mx-2'>
                        <FontAwesomeIcon icon={faXTwitter} size='lg' />
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Footer
