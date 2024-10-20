'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from 'lucide-react'

import Logo from '../../../public/logo.png'
import PricingTag from '../../../public/pricing-tag.png'
import Link from 'next/link';

export default function Component({ isOpen, setIsOpen }) {
    const [isLargeScreen, setIsLargeScreen] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768)
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Check initial screen size

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const showSidebar = isLargeScreen || (!isLargeScreen && isOpen)

    return (
        <div
            className={`
        fixed top-0 left-0 z-10 h-full min-h-screen w-[260px] bg-foreground p-[10px] pl-[30px] 
        flex-col gap-y-[25px] shadow-sidebar transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        ${isLargeScreen ? 'md:relative md:translate-x-0' : ''}
      `}
        >
            {!isLargeScreen && (
                <button className="absolute top-2 right-3" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6 text-white" />
                </button>
            )}

            <span className="flex flex-row items-center w-auto md:hidden">
                <Image src={Logo} alt="logo" height={52} width={52} className="h-[52px] w-[52px]" />
                <p className="font-bold text-[17px] leading-[18px] ml-2">SnagBot</p>
            </span>

            <span className="flex flex-row w-full leading-[19px] items-center my-[25px]">
            <Link href="/pricing">
                <Image src={PricingTag} alt="pricing-tag" height={19} width={19} className="h-[19px] w-[19px] mr-2" />
                Explore Pricing
            </Link>
            </span>

            <span className="flex flex-col gap-y-[2px] my-3">
                <span className="font-bold text-[14px] text-white">Today</span>
                <ul>
                    {['Best Taco near me on budget', 'Cheapest sushi restaurant', 'Top rated Italian place', 'Vegan options nearby'].map((item, index) => (
                        <li key={index} className="text-[14px] font-medium text-white/80 my-2 truncate fade-out-text">
                            {item}
                        </li>
                    ))}
                </ul>
            </span>

            <span className="flex flex-col gap-y-[2px] my-3">
                <span className="font-bold text-[14px] text-white">Yesterday</span>
                <ul>
                    {['Family-friendly restaurants', 'Best coffee shops for work'].map((item, index) => (
                        <li key={index} className="text-[14px] font-medium text-white/80 my-2 truncate fade-out-text">
                            {item}
                        </li>
                    ))}
                </ul>
            </span>
        </div>
    )
}