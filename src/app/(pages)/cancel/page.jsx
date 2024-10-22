import React from 'react'
import { VscError } from "react-icons/vsc";
import Link from 'next/link';
function page() {
  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
  
           <VscError class="text-red-600 w-[10%] h-[10%] mx-auto my-6"/>
     
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment error!</h3>
            <p class="text-gray-600 my-2">Try after some time. Check your card.</p>
            <p> sorry for incovinice  </p>
            <div class="py-10 text-center">
                <Link href="/pricing" class="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                    GO BACK 
               </Link>
            </div>
        </div>
    </div>
  </div>
  )
}

export default page