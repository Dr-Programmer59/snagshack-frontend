'use client'
import React, { useEffect, useState } from 'react'
import InputFieldLabel from "../../../components/label-input";
import { toast,Bounce  } from 'react-toastify';

import { X, Mail, Lock } from 'lucide-react';
import Button from '../../../components/button';
import { useDispatch } from 'react-redux';
import { forgot, reset } from '../../../lib/actions/user';
function page({params}) {
    useState
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpass, setconfirmpass] = useState("")
    const dispatch=useDispatch();
  
    const handleResetPassword=async()=>{
        if(password!=confirmpass){
            toast.error(`Password not matched!`, {
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
        let res=await dispatch(reset(params.tokenid,{password}))
        if(res){
            toast.success('Password changed .', {
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
        else{
            toast.error(`Something Went wrong!`, {
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
    <div className="rounded-[10px] h-screen w-screen flex items-center justify-center bg-[#1D1D1D]">
            <div className="bg-[#1D1D1D] p-8 rounded-lg shadow-xl w-full h-full relative flex justify-center items-center flex-col">
            <InputFieldLabel
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        icon={<Lock size={20} className="text-white/60" />}
                    />
                <InputFieldLabel
                        label="confirm Password"
                        type="password"
                        value={confirmpass}
                        onChange={(e) => setconfirmpass(e.target.value)}
                        icon={<Lock size={20} className="text-white/60" />}
                    />
                 <Button
                        onClick={handleResetPassword}
                        name="Submit"
                        customClass="bg-primary text-black mt-6 "
                    />
    </div>
    </div>
  )
}

export default page