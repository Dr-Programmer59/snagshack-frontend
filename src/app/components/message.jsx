"use client"

import Image from "next/image"
import Logo from '../../../public/logo.png'
import Placeholder from '../../../public/image-placeholder.png'
import { useState } from "react"

{/*Icons from lucide react*/ }
import { ThumbsUp, ThumbsDown, Flag, Clipboard, Repeat } from "lucide-react"


const Message = ({ sender, message }) => {

    const [activeIcon, setActiveIcon] = useState(null);

    const handleIconClick = (icon) => {
        setActiveIcon(icon);
    };

    return (
        <div className={`flex ${sender === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>

            <div className={`flex flex-row  items-center gap-x-2  ${sender === 'bot' ? 'justify-start' : 'justify-end'} `}>

                <Image src={(sender === 'bot' ? Logo : Placeholder)} className="h-[36px] w-[36px]" />
                <div className='flex flex-col w-full max-w-[500px] md:max-w-full gap-y-2'>

                    {/*Sender name */}
                    <p className="font-ginto text-[14px] font-bold text-white/60 ">{sender === 'bot' ? 'SnagBot' : sender}</p>

                    {/*Message component */}
                    <div className={`px-[20px] py-[15px] bg-[#171717] rounded-[10px] ${sender === 'bot' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                        <p className="font-inter font-medium text-[14px] text-white/80 leading-[19px]">{message}</p>
                    </div>

                    {/*Action Buttons only is the sender is the bot*/}
                    {sender === 'bot' && (
                        <span className="flex flex-row gap-x-[10px]">
                            <ThumbsUp
                                height={15}
                                className={`cursor-pointer ${activeIcon === 'thumbs-up' ? 'text-primary' : ''}`}
                                onClick={() => handleIconClick('thumbs-up')}
                            />
                            <ThumbsDown
                                height={15}
                                className={`cursor-pointer ${activeIcon === 'thumbs-down' ? 'text-primary' : ''}`}
                                onClick={() => handleIconClick('thumbs-down')}
                            />
                            <Repeat
                                height={15}
                                className={`cursor-pointer ${activeIcon === 'repeat' ? 'text-primary' : ''}`}
                                onClick={() => handleIconClick('repeat')}
                            />
                            <Flag
                                height={15}
                                className={`cursor-pointer ${activeIcon === 'flag' ? 'text-primary' : ''}`}
                                onClick={() => handleIconClick('flag')}
                            />
                            <Clipboard
                                height={15}
                                className={`cursor-pointer ${activeIcon === 'clipboard' ? 'text-primary' : ''}`}
                                onClick={() => handleIconClick('clipboard')}
                            />
                        </span>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Message
