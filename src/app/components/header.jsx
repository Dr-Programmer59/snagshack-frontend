"use client";

import React, { useState } from "react";
import Button from "./button";
import Image from "next/image";
import Form from "./form";
import Modal from "./modal";
import { Menu } from "lucide-react";
import HeaderSuggestionCard from './header-recommendation.jsx';
import LoginPage from '../components/login'
import SignupPage from '../components/signup'
import PlaceHolder from "../../../public/image-placeholder.png";

import {useSelector} from 'react-redux';

{/*Images*/ }
import Logo from "../../../public/logo.png";
import Burger from '../../../public/burger.png'
import Cash from '../../../public/cash.png'
import Building from '../../../public/building.png'
import Art from '../../../public/art.png'

const details = [
    {
        path: Burger,
        title: 'Feeling Hungry',
    },
    {
        path: Cash,
        title: 'Feeling Cheap',

    },
    {
        path: Building,
        title: 'Stressed Out',
    },
    {
        path: Art,
        title: 'Feeling Creative?',
    },


]

const Header = ({ isOpen, setIsOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [showForm, setShowForm] = useState('login')
    const {user} = useSelector(store => store.userReducer);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleFormModal = () => {
        setShowForm('login')
        setIsFormModalOpen(!isFormModalOpen);
    };

    return (
        <div className="flex flex-row justify-between items-center border-b-[#fff]/10 border-b-[2px] text-white py-[15px] w-full max-w-[1446px] px-[10px] md:px-[20px]">

            {/* Logo and name */}
            <span className="md:flex flex-row items-center hidden">

                <Image src={Logo} alt="logo" className="h-[52px] w-[52px]" />

                <p className="font-ginto text-[17px] font-bold leading-[18px] ml-2 block ">SnagBot</p>
            </span>

            <p className="font-abz text-white font-medium text-[17px] leading-[17px] h-[17px] md:hidden w-[130px]">Chat Bot</p>




            {/*Small suggestion cards*/}
            <div className="flex flex-row gap-3 justify-start px-[5px] md:hidden overflow-scroll hide-scrollbar mx-[20px]">
                {
                    details.map((detail) => {
                        return <HeaderSuggestionCard imgPath={detail.path} title={detail.title} />
                    })
                }
            </div>


            <span className="flex items-center md:hidden">
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




            {/*Button to open sidebar on small devices*/}
            <button className="md:block hidden" onClick={() => { setIsOpen(true) }}>
                <Menu height={25} />
            </button>



            {/*Login/Signup Modal */}
            {isFormModalOpen && (
                <Modal onClose={toggleFormModal}>
                    {showForm === 'login' ?
                        <LoginPage closeModal={toggleFormModal} changeForm={setShowForm} /> : <SignupPage closeModal={toggleFormModal} changeForm={setShowForm} />
                    }
                </Modal>
            )}

            {/*Profile Modal */}
            {isModalOpen && (
                <Modal onClose={toggleModal}>
                    <Form closeModal={toggleModal} />
                </Modal>
            )}


        </div>
    );
};

export default Header;
