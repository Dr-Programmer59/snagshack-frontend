"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './button';
import InputField from './input-field';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { IoLogOutSharp } from "react-icons/io5";
import { changePassword, loadme, logout, reset, updateUser } from '../lib/actions/user';

import { useRouter } from 'next/navigation';


const Membership = ({ plan, daysLeft }) => (
    <div className="mt-6 w-full">
        <h2 className="font-inter font-bold text-white text-[17px] mb-4">Membership</h2>

        <div className="flex flex-row sm:flex-row justify-between px-[20px] py-[20px] lg:py-[15px] rounded-[10px] bg-[#222222]">
            <span className="text-[15px] lg:text-[13px] font-medium font-inter text-white/60">Current Plan</span>
            <span className="text-[15px] lg:text-[13px] font-medium font-inter text-white/98">{plan}</span>
        </div>

        <div className="w-full bg-[#22222] rounded-full h-2.5 my-4 flex flex-row">
            <div className="bg-primary h-[10px] rounded-full" style={{ width: `${((30 - daysLeft) / 30) * 100}%` }}></div>
            <div className="bg-[#222222] h-[10px] rounded-full" style={{ width: `${(daysLeft / 30) * 100}%` }}></div>
        </div>

        <div className="flex justify-between text-sm">
            <span className="text-[15px] lg:text-[13px] font-medium font-inter text-white/60">Days Left</span>
            <span className="text-[15px] lg:text-[13px] font-medium font-inter text-white/98">{daysLeft} Days</span>
        </div>
    </div>
);

export default function Form({ closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const { user } = useSelector(store => store.userReducer);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [daysleft, setdaysleft] = useState(0)
    const [plan, setplan] = useState(null)
    const [resetPassw, setresetPassw] = useState(false)
    const [pass1, setpass1] = useState("")
    const [pass2, setpass2] = useState("")
    const [oldPass, setoldPass] = useState("")
    const router = useRouter();
    useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
            setPreviewUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`)
            setplan(user?.subscription_plan)
            console.log(user)
            if (user?.subscription_plan == "basic") {
                const currentDate = new Date();
                const expiration = new Date(user.payment_time);

                // Calculate the difference in days
                const timeDiff = expiration - currentDate;
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

                setdaysleft(daysRemaining);
            }


        }

    }, [user])

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

    const handleClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden input
    };

    const ProfilePicture = ({ src, onUpload }) => (
        <div className="flex flex-row sm:flex-row items-center m-6 gap-x-4 gap-y-4 lg:gap-y-2">
            <div className="w-[88px] h-[88px] md:h-[54px] md:w-[54px] lg:w-[50px] lg:h-[50px] bg-white rounded-full mb-2 flex items-center justify-center overflow-hidden">
                {src ? (
                    <img src={src} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500 text-4xl"></span>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the input
            />
            <button onClick={handleClick} className="w-full max-w-[213px]  bg-[#222222] h-[54px] lg:h-[44px] flex justify-center items-center font-inter font-medium text-[15px] lg:text-[13px] text-white/60 rounded-[16px]">
                <Upload size={19} className="mr-2 text-white lg:max-h-[15px]" />
                Upload Profile Icon
            </button>
        </div>
    );

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Preview the image before upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            if (selectedFile) {
                formData.append('file', selectedFile);
            }
            // console.log('Save changes', { name, email });
            const res = await dispatch(updateUser(formData))
            if (res) {
                toast.success('Updated sucessfully!', {
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

    };
    const handleResetPassword = async () => {
        if (pass1 != pass2) {
            toast.error(`Password Don't matched!`, {
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
            return
        }
        let res = await dispatch(changePassword({ oldpassword: oldPass, newpassword: pass1 }))
        if (res) {
            console.log(res)
            toast.success('Updated sucessfully!', {
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
            console.log(res)
            toast.error(`old Password is not correct!`, {
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
    return (
        <div className="rounded-[10px] flex items-center justify-center bg-[#1D1D1D]">
            <div className="bg-[#1D1D1D] p-8 rounded-lg shadow-xl w-full sm:max-w-[571px] relative">
                <div className="w-full flex flex-row justify-between items-center mb-6">
                    <h2 className="font-inter font-bold text-white text-[17px]">{resetPassw ? "Reset Password" : "My Profile"}</h2>
                    <button className="h-[17px]" onClick={closeModal}>
                        <X size={27} className="text-white" />
                    </button>
                </div>

                {
                    resetPassw ?
                        <>
                            <InputField label="Enter Old Password" type="password" value={oldPass} onChange={(e) => setoldPass(e.target.value)} />

                            <InputField label="Enter Password" type="password" value={pass1} onChange={(e) => setpass1(e.target.value)} />

                            <InputField label="Enter Password again" type="password" value={pass2} onChange={(e) => setpass2(e.target.value)} />
                            <div className="flex  w-full  mt-12 space-x-5">

                                <Button onClick={handleResetPassword} customClass="bg-primary text-black h-[54px] font-inter text-[17px] font-semibold" name="Save Changes" />
                                <Button onClick={() => { setresetPassw(!resetPassw) }} customClass="bg-white text-black h-[54px] font-inter text-[17px] font-semibold" name="Back" />

                            </div>

                        </>
                        :
                        <>


                            <ProfilePicture src={previewUrl} onUpload={handleFileChange} />

                            <InputField customClass="lg:h-[44px]" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                            <InputField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <div className="flex  w-full  mt-12  space-x-5">

                                <Button onClick={handleSave} customClass="bg-primary text-black h-[54px] font-inter text-[17px] font-semibold lg:h-[35px] lg:text-[15px]" name="Save Changes" />
                                <Button onClick={() => { setresetPassw(!resetPassw) }} customClass="bg-white text-black h-[54px] font-inter text-[17px] font-semibold lg:h-[35px] lg:text-[15px]" name="Reset Password" />

                            </div>

                            <Membership plan={plan ? plan : "No Plan"} daysLeft={daysleft} />


                        </>
                }

            </div>
        </div>
    );
}