"use client"
import Image from "next/image"
import Logo from '../../../public/logo.png'
import Heading from "./heading"
import Text from "./text"
import SuggestionCard from './suggestion-card'
import Button from "./button"
import Input from './input'
import Message from './message'
import Help from '../../../public/help.png'

import Burger from '../../../public/burger.png'
import Art from '../../../public/art.png'
import Cash from '../../../public/cash.png'
import Building from '../../../public/building.png'

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { fetchEmail } from '../lib/actions/user';

const details = [
    {
        path: Burger,
        title: 'Feeling Hungry',
        description: 'Let us pick our top recommendations'
    },
    {
        path: Cash,
        title: 'Feeling Cheap',
        description: 'Let us pick our top recommendations'
    },
    {
        path: Building,
        title: 'Stressed Out',
        description: 'Let us pick our top recommendations'
    },
    {
        path: Art,
        title: 'Feeling Creative',
        description: 'Let us pick our top recommendations'
    },
]

const ContentBox = () => {
    const [messages, setMessages] = useState([])
    const [inputValue, setinputValue] = useState("")
    const { user } = useSelector(store => store.userReducer);
    const [currentEmail, setcurrentEmail] = useState("")
    const dispatch = useDispatch();
    
    const fetchOTP=async (email)=>{
        let res=await axios.post(`${process.env.SMTP_PUBLIC_BACKEND_URL}/check-otp`,{email})
        if(res){
            // print(res.data.otp)
            console.log(res.data.otp)
            return res.data.otp;
        }
    }

   
    const fetchData = async (question) => {
        try {
          const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCe5W-9F6pQVaD9Wjr9fFaknn0GaJrLacc',
            {
              contents: [
                {
                  parts: [{text:`
                        You are SnagShack, an automated assistant for a subscription service that provides discounts and promotional codes for services like Uber Eats. Your task is to respond to users based on the FAQ information provided. Follow these instructions:

    Response Format: Always return answers in JSON format with the following fields:

    json

    {
    "answer": "Provide a 4-5 line response, include emojis to engage the user",
    "attachment": "video or null depending on whether a guide/video is necessary",
    "keyword": "determine based on the query"
    }
    Emojis: Add emojis to make the responses fun and engaging (e.g., food-related emojis for food queries, padlock or shield for security topics, etc.). Use friendly and conversational language to enhance user interaction.

    Keywords:

    For food, Uber Eats accounts, or anything related (e.g., "I need food", "Uber Eats account", "FOOD"), set "keyword": "food_snag". Example response: "Ok, sir! 🍕 We are sending your Uber Eats account. 🍔 Enjoy your meal!"
    For OTP or verification code queries (e.g., "OTP", "code", "verification"), set "keyword": "otp_snag". Example response: "We’ve got your back! 🔐 Your OTP code is  📩"
    Attachment:

    If the question requires additional guidance or tutorial videos (like placing an order, using a VCC, or setting up a VPN), set "attachment": "video".
    Otherwise, set "attachment": null.
    FAQ Responses:
    1. What is SnagShack?

    Answer: "SnagShack is your one-stop shop for saving 💸! With access to discounts for Uber Eats, Chegg, and more, you’ll unlock amazing deals every day! 🎉"
    Attachment: null
    Keyword: null
    2. How much does SnagShack cost?

    Answer: "Our subscription is just $59/month for the Lite plan! 🌟 It includes two Uber Eats accounts per day with discounts of $20-$30 each, giving you at least $80 in value. 🍽️"
    Attachment: null
    Keyword: null
    3. How do I use SnagShack for Uber Eats?

    Answer: "Just type 'FOOD' in the chat and we’ll send you an Uber Eats account! 🛵🍔 It's super simple, and we also have video guides to help you place your orders with ease. 📹"
    Attachment: "video" (if video guide available)
    Keyword: "food_snag"
    4. How many Uber Eats accounts can I generate daily?

    Answer: "You can generate 2 Uber Eats accounts per day with SnagShack! 🥳 Each account comes with awesome discounts! 💰"
    Attachment: null
    Keyword: "food_snag"
    5. How do I get an OTP code?

    Answer: "Just type 'Verify' in the chat and provide your account email. ✉️ Wait a minute, then press 'I sent OTP'. 🔐 We'll send your code right away! 🔑"
    Attachment: null
    Keyword: "otp_snag"
    6. Do I need a virtual credit card (VCC)?

    Answer: "Yes! 💳 To place orders, you'll need a VCC. Use 'VCC INFO' in the chat for guides on getting one. Click 'More Info' for detailed steps! 🛠️"
    Attachment: "video" (if a VCC guide is available)
    Keyword: null
    7. How do I cancel my subscription?

    Answer: "You can cancel your subscription anytime via your account settings. ⚙️ Once canceled, you’ll have access until the end of your billing cycle. 🗓️ Type 'SUPPORT' for help."
    Attachment: null
    Keyword: null
    8. Is there a referral program?

    Answer: "Our referral program isn’t public yet, but stay tuned! 🚀 We’ll let you know when it’s ready! 👀"
    Attachment: null
    Keyword: null
    9. Do you offer a free trial?

    Answer: "Currently, we don’t offer a free trial. 🚫 But trust us, SnagShack is totally worth it for the amazing savings! 💰"
    Attachment: null
    Keyword: null
    10. What if I have issues with my account?

    Answer: "If you face any problems, just type 'SUPPORT' in the chat. 🙋 We’re here to help and usually respond the same day. 👍"
    Attachment: null
    Keyword: null
    11. What does the Lite plan include?

    Answer: "The Lite plan gives you access to 2 Uber Eats accounts daily 🍕, along with guides for placing easy orders. 🛵"
    Attachment: null
    Keyword: "food_snag"
    12. How can I upgrade to the Pro plan?

    Answer: "The Pro plan is coming soon! 🎉 Stay tuned for updates! 🚀"
    Attachment: null
    Keyword: null
    13. How do I find out which services are available?

    Answer: "Type '/services' in the chat to see all the current services we offer! 📋 We’re adding new ones frequently! 🔄"
    Attachment: null
    Keyword: null
    14. What browsers should I use with SnagShack?

    Answer: "For best results, use Chrome Guest or Brave private mode 🛡️ on desktop. For mobile, DuckDuckGo or Brave in private mode works great! 📱 Don’t forget to clear cookies after each use."
    Attachment: null
    Keyword: null
    15. Can I get a refund?

    Answer: "We don’t offer refunds after a subscription is processed. 💳 You can cancel your subscription anytime to stop future charges! 🛑"
    Attachment: null
    Keyword: null
    16. How do I get a VCC?

    Answer: "To get a VCC 💳, create a Porte bank account—it’s super easy! Or use Apple Cash VCC if you have an iPhone. 📱 Click 'More Info' for guides!"
    Attachment: "video" (if a VCC guide is available)
    Keyword: null
    17. Do I need a VPN?

    Answer: "Yes! A VPN is highly recommended to avoid account bans 🔒. Proton VPN is free, but Mullvad VPN ($5/month) is even better! 💻 Check 'More Info' for setup steps."
    Attachment: "video" (if a VPN guide is available)
    Keyword: null

                    `},
                    {
                      text: `
                     Customer Question:
                    ${question}`
                    },
                  ],
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        //   setResponseData(response.data);
        let responsereq=response.data.candidates[0].content.parts[0].text
        console.log(responsereq.replace(/```/g,"").replace("json","").replace("JSON",""))
        const jsonAnswer=JSON.parse(responsereq.replace(/```/g,"").replace("json","").replace("JSON",""))

        if(jsonAnswer.keyword=="food_snag"){
           let email= await fetchEmail();
           
           if(email){
            setMessages([...messages,{msg:`${jsonAnswer.answer} 
            ${email}`,"role":"bot"}])

            setcurrentEmail(email)
           }
           else{
            setMessages([...messages,{msg:"Your daily limit reached. Please ask for email tommorow.","role":"bot"}])

           }


        }
        else if (jsonAnswer.keyword=="otp_snag"){
            if(currentEmail!=""){
                let otp=await fetchOTP(currentEmail)
                setMessages([...messages,{msg:`${jsonAnswer.answer} 
                    ${otp}`,"role":"bot"}])
                setcurrentEmail("")
            }
            else{
                setMessages([...messages,{msg:"Please get email first , then ask for OTP.","role":"bot"}])
            }
           
        }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const onSubmit=()=>{
       
        setMessages([...messages,{msg:inputValue,"role":"user"}])
        
      
    
    }

    useEffect(() => {
        if(inputValue!=""){
        
        if(inputValue.includes("/get")){
            setMessages([...messages,{msg:"Here's Your email","role":"bot"}])
    
            }
            else if(inputValue.includes("/otp")){
                setMessages([...messages,{msg:"Checking For otp...","role":"bot"}])
    
            }
            else {
                fetchData(inputValue)
            }
            setinputValue("")
        }
    }, [messages])
    
    const handleInputChange=(e)=>{
        e.preventDefault();
        setinputValue(e.target.value)
    }
    return (
        <div className="h-screen flex flex-col hide-scrollbar">
            <div className="flex-grow overflow-hidden hide-scrollbar">
                <div className="h-full overflow-y-auto pb-24 hide-scrollbar">
                    <div className='w-full max-w-[1040px] mx-auto flex flex-col py-[50px] justify-center items-center md:px-[10px] hide-scrollbar md:py-0'>
                        {
                            user ? <>
                            </>
                                :
                                <>
                                    <Image src={Logo} alt="logo" height={154} width={154} />

                                    <div className="flex flex-col gap-y-5 items-center px-[20px]">
                                        <Heading text="Meet the Snag Bot " />
                                        <Text content="Lorem ipsum dolor set amet consectetur adipsicing dolor set" customClass="text-center" />

                                        <div className="flex flex-wrap gap-5 justify-center ">
                                            <Button name="Create Account" customClass="h-[49px] w-[265px] bg-primary text-black font-bold" />
                                            <Button name="Login" customClass="h-[49px] w-[265px] bg-black text-white font-light border border-white/30" />
                                        </div>

                                    </div>
                                </>

                        }



                        <div className="flex flex-wrap gap-5 md:gap-3 justify-center px-[10px] py-[50px] md:py-[20px]">
                            {details.map((detail, index) => (
                                <SuggestionCard key={index} imgPath={detail.path} title={detail.title} description={detail.description} />
                            ))}
                        </div>
                        <div className="w-full hide-scrollbar">
                            <div className="w-full flex flex-col gap-y-2 md:gap-y-4">
                                {
                                    messages.map((value)=>(
                                        <Message sender={value.role} message={value.msg} />
                                    ))
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[100px] items-center justify-center bg-black fixed bottom-0 w-[80%] md:w-full  px-[30px] ">
                <Input 
                value={inputValue}
                onChange={handleInputChange}
                onSubmit={onSubmit}
                />
            </div>



            <button className="fixed right-5 bottom-20 bg-primary h-[45px] w-[45px] rounded-full border-none text-black flex justify-center items-center md:hidden">
                <Image alt="help-logo" src={Help} className="h-[32px] w-[31px]" />
            </button>
        </div>
    )
}

export default ContentBox