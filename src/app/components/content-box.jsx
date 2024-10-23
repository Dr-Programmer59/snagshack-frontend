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
import LoginPage from "./login";
import SignupPage from "./signup";
import Modal from "./modal";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { fetchEmail } from '../lib/actions/user';
import Form from "./form"
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContentBox = ({messages,setMessages,inputValue,setinputValue}) => {
    const { user } = useSelector(store => store.userReducer);
    const [currentEmail, setcurrentEmail] = useState("")
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false); // State to handhle navbar open/close
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState('login')
    const router = useRouter();
const details = [
    {
        path: Burger,
        title: 'Feeling Hungry',
        description: 'Enjoy discounted food now!',
        onSubmit:()=>{
            console.log("working")
            setinputValue("Send me Food")
            setMessages([...messages,{msg:"Send me Food","role":"user"}])
        }
    },
    {
        path: Cash,
        title: 'Sign up now!',
        description: 'Don’t miss out on these amazing promos!.',
        onSubmit:()=>{
          
                if(user){
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
                else{
                    toggleFormModal()
                    
                }
            
        }
    },
    {
        path: '',
        title: 'Coming Soon',
        description: '',
        onSubmit:()=>{
            console.log("working")
            
        }
    },
    {
        path: '',
        title: 'Coming Soon',
        description: '',
        onSubmit:()=>{
            console.log("working")
            
        }
    },
]

    useEffect(() => {
      console.log(user)
    
      
    }, [])
    
    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Toggle the navbar
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const fetchOTP=async (email)=>{
        let res=await axios.post(`${process.env.NEXT_PUBLIC_SMTP_URL}/check-otp`,{email})
        if(res){
            // print(res.data.otp)
            console.log(res.data.otp)
            return res.data.otp;
        }
    }

   
    const fetchData = async (question) => {
       
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo', // or the latest model
                messages: [
                  {
                    role: 'system',
                    content: `
                SnagShack is a subscription service offering exclusive access to discounts and promotional codes for a variety of services. Our goal is to help you save on everyday needs, from food deliveries to online resources, while keeping the process simple and user-friendly. Here's how it works:
Please be professional,comprehensive so that our customer will understand everything. Make sure he don't get bored. Here we have some few more parameters to make sure 
add emojis as required
I will give u sample question and answer so that you can understand what we are trying to do. don't give same answers rewrite by urself add required emojis. make professional answer. match the customer vibes.. and just be expressive
 Response Format: Always return answers in JSON format with the following fields, Don't add any thing else outside of json:

    json

    {
    "answer": "Provide a 4-5 line response, include emojis to engage the user",
    "attachment": "video or null depending on whether a guide/video is necessary",
    "keyword": "determine based on the query"
    }
    Emojis: Add emojis to make the responses fun and engaging (e.g., food-related emojis for food queries, padlock or shield for security topics, etc.). Use friendly and conversational language to enhance user interaction.

    Keywords:
    Note: only add keyword when we have food in our text. or like we have otp. Don't add irrelevant stick to ur work only.  And if user write give me otp .send me otp then do send.. don't add keyword everytime like u add keyword when user ask like how we can get otp? so at this time u just give them answer from FAQ
    For food, or anything related Don't add food_snag every time. just when user say i need food. I want food. send me food ... so only that time(e.g., "I need food", "FOOD"), set "keyword": "food_snag". Example response: "Ok, sir! 🍕 We are sending your Uber Eats account. 🍔 Enjoy your meal!"
    For OTP or verification code queries (e.g., "give me otp", "send me otp", ), set "keyword": "otp_snag". Example response: "We’ve got your back! 🔐 Your OTP code is  📩"
    Note: Don't set otp_snag if user ask question like how i can get otp or somethingl ike that.. only send when user ask to get otp not when he questioned.
    For "SUBSCRIBE" and other related things. If user write want to scubscribe, Subscribe  or something like set "keyword" :"subscribe_snag". Make sure to return json nothing else. Answer the user . okay we are ridirecting to our plans. 
    Note : Don't set keyword when user ask how to subscribe or something like that only if user write "want to subscribe" Subscribe
    Attachment:

    If the question requires additional guidance or tutorial videos (like placing an order, using a VCC, or setting up a VPN), set "attachment": "video".
    Otherwise, set "attachment": null.
  


Plain FAQS

What is SnagShack? SnagShack is your go-to platform for saving money! We provide access to discounts on popular services, ensuring you get the best value every day. Enjoy special offers and deals tailored to meet your needs.

How much does SnagShack cost? Our subscription is priced at $59 per month for the Lite plan, which includes access to discounts worth $20-$30 each, providing at least $80 in value every day. It’s a cost-effective way to save more while spending less.

How do I use SnagShack for my orders? Simply type 'FOOD' in the chat, and we’ll send you all the details needed to place an order. It’s quick and easy! We also provide video tutorials to help guide you through the process if needed.

How many accounts can I generate daily? With our Lite plan, you can generate two accounts each day, each offering fantastic savings to make sure you never miss out on deals.

How do I get an OTP code? For verification, just type 'Verify' in the chat and provide your account email. Wait a minute, and then press 'I sent OTP'. We’ll send your code immediately!

Do I need a virtual credit card (VCC)? Yes! A virtual credit card is necessary to complete your orders. If you need help setting one up, simply type 'VCC INFO' in the chat, and we’ll provide guides to assist you.

How do I cancel my subscription? You can cancel your subscription anytime through your account settings. Once canceled, your access will remain active until the end of your billing cycle. If you need help, type 'SUPPORT' in the chat.

Is there a referral program? While our referral program isn’t public yet, stay tuned! We’ll let you know as soon as it becomes available.

Do you offer a free trial? Currently, we don’t offer a free trial. However, SnagShack provides such great savings that it more than justifies the subscription cost.

What if I have issues with my account? If you’re experiencing any issues, just type 'SUPPORT' in the chat. We’re here to assist you and usually resolve issues the same day.

What does the Lite plan include? The Lite plan gives you access to two daily accounts along with detailed guides to help you place orders easily.

How can I upgrade to the Pro plan? The Pro plan is coming soon! Stay tuned for more details and an even better experience.

How do I find out which services are available? You can easily see all the services we offer by typing '/services' in the chat. We’re constantly updating our list to provide more options!

What browsers should I use? For the best experience, use Chrome Guest or Brave private mode on desktop. For mobile users, DuckDuckGo or Brave in private mode is recommended. Make sure to clear your cookies after each session to ensure smooth performance.

Can I get a refund? We don’t offer refunds once a subscription is processed. However, you can cancel at any time to prevent future charges.

How do I get a virtual credit card (VCC)? You can easily get a VCC by creating a bank account or using an Apple Cash VCC if you’re an iPhone user. We offer guides to help you through the setup.

Do I need a VPN? Yes, we highly recommend using a VPN to prevent any issues with account bans. Free options like Proton VPN are available, but we suggest Mullvad VPN for better reliability at $5 per month. We provide step-by-step guides for VPN setup as well.
                  




`
                  },
                  ...messages.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.msg
                  })),
                  {
                    role: 'user',
                    content: question
                  }
                ]
              }, {
                headers: {
                  'Authorization':  process.env.NEXT_PUBLIC_OEPN_AI_KEY,
                  'Content-Type': 'application/json'
                }
              });
        
         
        //   setResponseData(response.data);
        console.log("before data ",response)
        let responsereq=response.data.choices[0].message.content
        console.log(responsereq.replace(/```/g,"").replace("json","").replace("JSON",""))
        let jsonAnswer
        try{
        jsonAnswer=JSON.parse(responsereq.replace(/```/g,"").replace("json","").replace("JSON",""))
        }
        catch{
            try{
        jsonAnswer=JSON.parse(responsereq.substring(input.indexOf("{")));
            }
            catch{
                setMessages([...messages,{msg:responsereq,"role":"bot"}])
                return
            }

        }
        if(jsonAnswer.keyword=="food_snag" ){
            if(user?.subscription_plan){
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

        else if (!user?.subscription_plan){
            setMessages([...messages,{msg:"🍔 Want to access delicious food deals? Just type 'SUBSCRIBE' in the chat to join our exclusive subscription and unlock all the tasty offers! 🌮 Enjoy your meal!","role":"bot"}])

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
        else if (jsonAnswer.keyword=="subscribe_snag"){
            setTimeout(() => {
                router.push('/pricing');
            }, 1000);
        }
        else{
            setMessages([...messages,{msg:jsonAnswer.answer,"role":"bot"}])

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
                                            <Button name="Create Account" customClass="h-[49px] w-[265px] bg-primary text-black font-bold"
                                            
                                            onClick={() => {
                                                setShowForm('signup');
                                                toggleModal();
                                            }}
                                            />
                                            <Button name="Login" customClass="h-[49px] w-[265px] bg-black text-white font-light border border-white/30" 
                                            
                                            onClick={() => {
                                                setShowForm('login');
                                                toggleModal();
                                            }}
                                            />
                                        </div>

                                    </div>
                                </>

                        }



                        <div className="flex flex-wrap gap-5 md:gap-3 justify-center px-[10px] py-[50px] md:py-[20px]">
                            {details.map((detail, index) => (
                                
                                <SuggestionCard key={index} imgPath={detail.path} title={detail.title} description={detail.description} onSubmit={detail.onSubmit}/>
                                
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



            {/* <button className="fixed right-5 bottom-20 bg-primary h-[45px] w-[45px] rounded-full border-none text-black flex justify-center items-center md:hidden">
                <Image alt="help-logo" src={Help} className="h-[32px] w-[31px]" />
            </button> */}


            {isModalOpen &&

                <>
                {
                user ?
                        <Modal onClose={toggleModal}>
                            <Form closeModal={toggleModal} />
                        </Modal>
                        :
                        <Modal onClose={toggleModal}>
                            {showForm === 'login' ?
                                <LoginPage closeModal={toggleModal} changeForm={setShowForm} />
                                :
                                <SignupPage closeModal={toggleModal} changeForm={setShowForm} />
                            }
                        </Modal>
                }
                    
                    </>}
        </div>
    )
}

export default ContentBox