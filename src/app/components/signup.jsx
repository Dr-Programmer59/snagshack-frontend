"use client";
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import InputFieldLabel from './label-input';
import Button from './button';
import { useDispatch } from 'react-redux'
import { register } from '../lib/actions/user';
import { redirect, usePathname } from 'next/navigation'

export default function SignupPage({ closeModal, changeForm }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    // const router = useRouter();
    const router = useRouter();

  const handleRedirect = () => {
    router.push('/desktop'); // Client-side redirect to /new-page
  };
    const handleSignup = async() => {
        console.log('Sign up', { name, email, password });
        // Implement your signup logic here
        let res=await dispatch(register({name,email,password}))
        console.log("signing response ",res)

        if(res){
            handleRedirect()
        }
    };

    return (
        <div className="rounded-[10px] flex items-center justify-center bg-[#1D1D1D]">
            <div className="bg-[#1D1D1D] p-8 rounded-lg shadow-xl w-full sm:max-w-[571px] relative">
                <div className="w-full flex flex-row justify-between items-center mb-6">
                    <h2 className="font-inter font-bold text-white text-[24px]">Sign Up</h2>
                    <button className="h-[17px]" onClick={closeModal}>
                        <X size={27} className="text-white" />
                    </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <InputFieldLabel
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User size={20} className="text-white/60" />}
                    />
                    <InputFieldLabel
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={20} className="text-white/60" />}
                    />
                    <InputFieldLabel
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Lock size={20} className="text-white/60" />}
                    />

                    <Button
                        onClick={handleSignup}
                        name="Sign Up"
                        customClass="bg-primary text-black mt-6 w-full"
                    />
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60 font-inter text-[15px]">
                        Already have an account?
                        <a onClick={() => { changeForm('login') }} className="text-primary ml-2 font-semibold hover:cursor-pointer">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}