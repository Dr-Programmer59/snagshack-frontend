"use client";

import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './button';
import InputField from './input-field';



const ProfilePicture = ({ src, onUpload }) => (
    <div className="flex flex-row sm:flex-row items-center m-6 gap-x-4 gap-y-4">
        <div className="w-[88px] h-[88px] md:h-[54px] md:w-[54px]  bg-white rounded-full mb-2 flex items-center justify-center overflow-hidden">
            {src ? (
                <img src={src} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <span className="text-gray-500 text-4xl"></span>
            )}
        </div>

        <button onClick={onUpload} className="w-full max-w-[213px]  bg-[#222222] h-[54px] flex justify-center items-center font-inter font-medium text-[15px] text-white/60 rounded-[16px]">
            <Upload size={19} className="mr-2 text-white" />
            Upload Profile Icon
        </button>
    </div>
);

const Membership = ({ plan, daysLeft }) => (
    <div className="mt-6 w-full">
        <h2 className="font-inter font-bold text-white text-[17px] mb-4">Membership</h2>

        <div className="flex flex-row sm:flex-row justify-between px-[20px] py-[20px] rounded-[10px] bg-[#222222]">
            <span className="text-[15px] font-medium font-inter text-white/60">Current Plan</span>
            <span className="text-[15px] font-medium font-inter text-white/98">{plan}</span>
        </div>

        <div className="w-full bg-[#22222] rounded-full h-2.5 my-4 flex flex-row">
            <div className="bg-primary h-[10px] rounded-full" style={{ width: '25%' }}></div>
            <div className="bg-[#222222] h-[10px] rounded-full" style={{ width: '75%' }}></div>
        </div>

        <div className="flex justify-between text-sm">
            <span className="text-[15px] font-medium font-inter text-white/60">Days Left</span>
            <span className="text-[15px] font-medium font-inter text-white/98">{daysLeft} Days</span>
        </div>
    </div>
);

export default function Form({ closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const handleUpload = () => {
        console.log('Upload profile picture');
    };

    const handleSave = () => {
        console.log('Save changes', { name, email });
    };

    return (
        <div className="h-auto flex items-center justify-center flex-col px-4">
            <div className="bg-[#1D1D1D] p-8 rounded-lg shadow-xl w-full sm:min-w-[30px] max-w-[571px] relative">
                <div className="w-full flex flex-row justify-between items-center mb-6">
                    <h2 className="font-inter font-bold text-white text-[17px]">My Profile</h2>
                    <button className="h-[17px]" onClick={closeModal}>
                        <X size={27} className="text-white" />
                    </button>
                </div>

                <ProfilePicture src={profilePic} onUpload={handleUpload} />

                <InputField label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <InputField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="flex flex-row-reverse w-full mt-12">
                    <Button onClick={handleSave} customClass="bg-primary text-black h-[54px] font-inter text-[17px] font-semibold" name="Save Changes" />
                </div>

                <Membership plan="Basic" daysLeft={13} />
            </div>
        </div>
    );
}