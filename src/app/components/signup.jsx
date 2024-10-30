"use client";
import { useRouter } from 'next/navigation';
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import InputFieldLabel from './label-input';
import Button from './button';
import { useDispatch } from 'react-redux'
import { register ,loadme} from '../lib/actions/user';
import { redirect, usePathname } from 'next/navigation'

export default function SignupPage({ closeModal, changeForm }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTOS, setacceptTOS] = useState(false)
    const dispatch = useDispatch();
    // const router = useRouter();
    const router = useRouter();

  const handleRedirect = () => {
    router.push('/'); // Client-side redirect to /new-page
  };
    const handleSignup = async() => {
        try{
        if(!acceptTOS){
            toast.error('Accept Terms and Services to Proceed ', {
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
        console.log('Sign up', { name, email:email.toLowerCase(), password });
        // Implement your signup logic here
        let res=await dispatch(register({name,email,password}))
        console.log("signing response ",res)

        if(res){
            toast.success('SignUp sucessfully!', {
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
            toast.error('Please check your credentials!', {
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
        toast.error('Please check your credentials!', {
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
 
 <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" onClick={()=>{setacceptTOS(!acceptTOS)}} aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms-and-services" target='_blank'>Terms and Conditions</a></label>
                      </div>
                  </div>                
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