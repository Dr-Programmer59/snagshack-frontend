"use client";

import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import Button from './button';
import InputFieldLabel from './label-input';
import { useDispatch } from 'react-redux'
import { loadme, login } from '../lib/actions/user';
import { redirect } from 'next/dist/server/api-utils';

import { useRouter } from 'next/navigation';

import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage({ closeModal, changeForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/'); // Client-side redirect to /new-page
      };
    const handleLogin = async() => {
            try{
            console.log('Login', { email, password });
            let res=await dispatch(login(email,password))
            if(res){
                toast.success('Login sucessfully!', {
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
                
                setTimeout(async() => {
                    closeModal();
                    await dispatch(loadme())
                    handleRedirect()

                }, 1000);
            }
            else{
                toast.error('Please check your credentials', {
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
        catch(err){
            toast.error('Please check your credentials', {
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
    
        // Implement your login logic here
    };

    return (
        <div className="rounded-[10px] flex items-center justify-center bg-[#1D1D1D]">
            <div className="bg-[#1D1D1D] p-8 rounded-lg shadow-xl w-full sm:max-w-[571px] relative">
                <div className="w-full flex flex-row justify-between items-center mb-6">
                    <h2 className="font-inter font-bold text-white text-[24px]">Login</h2>
                    <button className="h-[17px]" onClick={closeModal}>
                        <X size={27} className="text-white" />
                    </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
                        onClick={handleLogin}
                        name="Login"
                        customClass="bg-primary text-black mt-6 w-full"
                    />
                </form>

                <div className="mt-6 text-center">
                    <p className="text-white/60 font-inter text-[15px]">
                        Don't have an account?
                        <a onClick={() => { changeForm('signup') }} className="text-primary ml-2 font-semibold hover:cursor-pointer">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}