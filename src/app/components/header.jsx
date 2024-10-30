"use client";

import React, { useEffect, useState } from "react";
import Button from "./button";
import Image from "next/image";
import Form from "./form";
import Modal from "./modal";
import { Menu } from "lucide-react";
import HeaderSuggestionCard from './header-recommendation.jsx';
import LoginPage from '../components/login'
import SignupPage from '../components/signup'
import PlaceHolder from "../../../public/image-placeholder.png";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { changePassword, loadme, logout, reset, updateUser } from '../lib/actions/user';

{/*Images*/ }
import Logo from "../../../public/logo.png";
import Burger from '../../../public/burger.png'
import Cash from '../../../public/cash.png'
import Building from '../../../public/building.png'
import Art from '../../../public/art.png'
import Link from 'next/link';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'

const Header = ({ isOpen, setIsOpen, messages, setMessages, inputValue, setinputValue }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [showForm, setShowForm] = useState('login')
    const { user } = useSelector(store => store.userReducer);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
            setPreviewUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`)

        }

    }, [user])
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleFormModal = () => {
        setShowForm('login')
        setIsFormModalOpen(!isFormModalOpen);
    };


    const handleLogout = async () => {
        try {

            // console.log('Save changes', { name, email });
            const res = await dispatch(logout())
            if (res) {
                toast.success('logout sucessfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                await dispatch(loadme())

                setTimeout(() => {
                    closeModal()
                }, 1000);

            }
            else {
                toast.error('Some problem occurs. Try again later! :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        }
        catch (err) {
            console.log(err)
            toast.error('Some problem occurs. Try again later! :(', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            console.log(err)
        }


    }

    const details = [
        {
            path: Cash,
            title: 'Sign Up Now',
            onSubmit: () => {
                if (user) {
                    toast.info('Account is created Already.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
                else {
                    toggleFormModal()

                }
            }


        },
        {
            path: Burger,
            title: 'Feeling Hungry',
            onSubmit: () => {

                console.log("working")
                setinputValue("FOOD")
                setMessages([...messages, { msg: "FOOD", "role": "user" }])
            }

        },
        {
            path: Building,
            title: 'GUIDE ME',
            onSubmit: () => {

                console.log("working")
                setinputValue("GUIDE")
                setMessages([...messages, { msg: "GUIDE", "role": "user" }])
            }


        },
        {
            path: Art,
            title: 'Coming Soon',
            onSubmit: () => {

            }
        },


    ]
    return (
        <div className="flex flex-row justify-between items-center border-b-[#fff]/10 border-b-[2px] text-white py-[15px] w-full max-w-[1446px] px-[10px] md:px-[20px]">
            <Link href="/" className="hidden md:flex">
                {/* Logo and name */}
                <span className="md:flex flex-row items-center hidden">

                    <Image src={Logo} alt="logo" className="h-[52px] w-[52px]" />

                    <p className="font-ginto text-[17px] font-bold leading-[18px] ml-2 block ">SnagBot</p>
                </span>
            </Link>
            <p className="font-abz text-white font-medium text-[17px] leading-[17px] h-[17px] md:hidden w-[130px]">Chat Bot</p>




            {/*Small suggestion cards*/}
            <div className="flex flex-row gap-3 justify-start px-[5px] md:hidden overflow-scroll hide-scrollbar mx-[20px]">
                {
                    details.map((detail) => {
                        return <HeaderSuggestionCard imgPath={detail.path} title={detail.title} onSubmit={detail.onSubmit} />
                    })
                }
            </div>


            {/*Logout Button*/}
            <button onClick={handleLogout} className="text-white" >
                <IoLogOut className='w-8 h-8' />
            </button>

            {user ?
                <span className="flex  items-center md:hidden">
                    {/* <Button name="Login" customClass="bg-[#000] text-[#fff] font-thin" onClick={() => { setIsFormModalOpen(true) }} /> */}


                    {/*User name */}
                    <p className="font-inter text-[14px]  text-white font-semibold mr-2">
                        {user.name}
                    </p>

                    <div className="w-[50px] h-[50px] md:h-[30px] md:w-[30px]  bg-white rounded-full mb-2 flex items-center justify-center overflow-hidden">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" onClick={toggleModal} />
                        ) : (
                            <span className="text-gray-500 text-4xl"></span>
                        )}
                    </div>




                    <>



                    </>


                </span>
                :
                ""
            }



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
