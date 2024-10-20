"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import Button from "../components/button";
import { ChevronDown, Menu, X } from "lucide-react"; // X for close, Menu for open
import LoginPage from "./login";
import SignupPage from "./signup";
import Modal from "./modal";
import {useSelector} from 'react-redux';
import PlaceHolder from "../../../public/image-placeholder.png";

import Form from "./form";


const Links = [
    {
        name: "Home",
        href: "",
    },
    {
        name: "Features",
        href: "",
    },
    {
        name: "Pricing",
        href: "",
    },
    {
        name: "Contact",
        href: "",
    },
];

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false); // State to handle navbar open/close
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState('login')
    const {user} = useSelector(store => store.userReducer);
    
    useEffect(() => {
      console.log(user)
    
      
    }, [])
    
    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Toggle the navbar
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <nav className="flex flex-row justify-between border-b-[#fff]/10 border-b-[0.5px] text-white py-[10px] w-full max-w-[1446px] px-[20px]">
            {/* Logo and name */}
            <span className="flex flex-row justify-center items-center w-auto px-5 md:px-[10px] ">
                <Image src={Logo} alt="logo" className="h-[52px] w-[52px] md:h-[36px] md:w-[36px]" />
                <p className="font-ginto text-[17px] font-bold leading-[18px] ml-2">SnagBot</p>
            </span>

            {/* Links and Buttons - Visible on larger screens */}
            <span className="flex md:hidden flex-row gap-x-[30px] w-full items-center px-[70px]">
                {Links.map((link, index) => (
                    <span key={index} className="flex flex-row h-[16px]">
                        <Link href={link.href} className="font-jakarta text-[15px] leading-[18px] mt-[0.5px]">
                            {link.name}
                        </Link>
                        <ChevronDown height="16px" className="pt-1" />
                    </span>
                ))}
            </span>

            {/* Action buttons */}
            {
                !user &&
                <span className="flex md:hidden flex-row justify-center items-center w-auto px-10 gap-x-4">
                <Button name="Login" customClass="bg-[#000] text-[#fff] font-thin"
                    onClick={() => {
                        setShowForm('login');
                        toggleModal();
                    }}
                />
                <Button name="SignUp" customClass="bg-white text-black"
                    onClick={() => {
                        setShowForm('signup');
                        toggleModal();
                    }} />
            </span>
            }
            

            {/* Mobile Menu - Only visible on small screens */}
            <div
                className={`md:fixed z-50 top-[0px] left-0 py-[20px] w-[200px] h-full bg-foreground text-white transition-transform transform ${isOpen ? "" : "hidden"
                    }`}>
                <div className="flex flex-col items-start  h-full px-[15px] space-y-2">
                    {/* Links for small devices */}
                    {Links.map((link, index) => (
                        <span key={index} className="flex flex-row">
                            <Link href={link.href} className="font-jakarta text-[18px]">
                                {link.name}
                            </Link>
                            <ChevronDown height="16px" className="ml-0 mt-2" />
                        </span>
                    ))}

                    {/* Action buttons for small devices */}
                    <div className="flex flex-col space-y-4 w-full mt-[10px]">
                        <Button name="Login" customClass="bg-[#000] text-[#fff] font-thin border-2 border-white/10 md:w-full"
                            onClick={() => {
                                setShowForm('login');
                                toggleModal();
                            }}
                        />
                        <Button name="SignUp" customClass="bg-white text-black"
                            onClick={() => {
                                setShowForm('signup');
                                toggleModal();
                            }}
                        />
                    </div>
                </div>
            </div>
            <button className="md:flex hidden mr-[10px]" onClick={toggleNavbar}>
                {/* Toggle between the menu icon and the close icon */}
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            {
                    user &&
                    <span className="flex md:hidden flex-row justify-center items-center w-auto px-10 gap-x-4">
                    {/* <Button name="Login" customClass="bg-[#000] text-[#fff] font-thin" onClick={() => { setIsFormModalOpen(true) }} /> */}
    
    
                    {/*User name */}
    
                   
                    <p className="font-inter text-[14px] text-white font-semibold mr-2">
                        {user?user.name:" "}
                    </p>
    
                    <Image
                        src={PlaceHolder}
                        alt="image-placeholder"
                        height="34"
                        width="34"
                        className="hover:cursor-pointer"
                        onClick={toggleModal}
                    />
                </span>
                }
       
            {/*Login/Signup Modal */}

            {isModalOpen &&

                <>
                {
                 user ?
                        <Modal onClose={toggleModal}>
                            <Form closeModal={toggleModal} />
                        </Modal>
                        :
                        <Modal onClose={toggleModal}>
                            {showForm === 'login' ?
                                <LoginPage closeModal={toggleModal} changeForm={setShowForm} />
                                :
                                <SignupPage closeModal={toggleModal} changeForm={setShowForm} />
                            }
                        </Modal>
}
                    
                    </>}
        </nav>
    );
};

export default Navbar;
