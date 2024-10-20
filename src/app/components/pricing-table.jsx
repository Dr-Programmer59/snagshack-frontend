import { Check } from 'lucide-react';
import Button from './button';


const PricingTable = () => {
    return (
        <div class="overflow-x-auto ">

            <table class="min-w-full text-left text-sm whitespace-nowrap">

                <thead class="uppercase tracking-wider border-b-2 border-[#2C2C2C] ">
                    <tr>

                        <th scope="col" class="px-6 py-4 md:hidden">

                        </th>

                        <th scope="col" class="px-6 py-4 border-l border-[#2C2C2C]">
                            <div className='flex flex-col gap-y-4 '>
                                <span className='font-inter text-[15px] text-white font-medium'>Basic</span>
                                <span className='font-ginto font-bold text-white text-[35px]'>59$</span>
                                <Button name="Purchase" customClass='bg-black text-white font-inter font-semibold text-[14px] border border-white/20 rounded-[10px] w-full max-w-full min-w-[263px] md:min-w-[100px]' />
                            </div>

                        </th>
                        {/* <th scope="col" class="px-6 py-4 border-l border-[#2C2C2C]">
                            <div className='flex flex-col gap-y-4'>
                                <span className='font-inter text-[15px] text-white font-medium'>Pro</span>
                                <span className='font-ginto font-bold text-white text-[35px]'>30$</span>
                                <Button name="Purchase" customClass='bg-black text-white font-inter font-semibold text-[14px] border border-white/20 rounded-[10px] w-full max-w-full min-w-[263px] md:min-w-[100px]' />
                            </div>
                        </th> */}
                    </tr>
                </thead>
                <tbody>

                    <tr class="border-b border-[#2C2C2C]">
                        <td class="px-6 pr-12 py-4 w-full font-inter font-medium text-white text-left2 md:hidden">
                        Up to 2 uber eats accounts per day
                        </td>

                        <td class="px-6 py-4 border-l w-full text-center border-[#2C2C2C] place-items-center">
                            <Check height={25} className='text-primary' /><span className='hidden md:flex'> Lorem ipsum dolor</span>
                        </td>

                       
                    </tr>
                    <tr class="border-b border-[#2C2C2C]">
                        <td class="px-6 pr-12 py-4 w-full font-inter font-medium text-white text-left2 md:hidden">
                        Minimum of 2 $20 uber eats promos
                        </td>


                        <td class=" px-6 py-4 border-l w-full text-center border-[#2C2C2C] place-items-center">
                            <Check height={25} className='text-primary' />
                            <span className='hidden md:flex'> </span>
                        </td>
                    </tr>
                    <tr class="border-b border-[#2C2C2C]">
                        <td class="px-6 pr-12 py-4 w-full font-inter font-medium text-white text-left2 md:hidden">
                           Access to full guides on how to place orders and get the most value
                        </td>

                      

                        <td class=" px-6 py-4 border-l w-full text-center border-[#2C2C2C] place-items-center">
                            <Check height={25} className='text-primary' />
                            {/* <span className='hidden md:flex'> Lorem ipsum dolor</span> */}
                        </td>
                    </tr>
                    <tr class="border-b border-[#2C2C2C]">
                        <td class="px-6 pr-12 py-4 w-full font-inter font-medium text-white text-left2 md:hidden">
                        Some accounts have 2 $20 off promos some have 2 $25 off some $30 promos
                        </td>

                        <td class="px-6 py-4 border-l w-full text-center border-[#2C2C2C] place-items-center">
                            <Check height={25} className='text-primary' /><span className='hidden md:flex'> Lorem ipsum dolor</span>
                        </td>

                        
                    </tr>






                </tbody>

            </table>

        </div>)
};

export default PricingTable;
