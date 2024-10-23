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
import { OpenAi } from "./OpenAiReq"
const mobileGuide=(
    <div className="space-y-4 text-base text-white">
      <p>
        <strong className="font-bold">Here’s a quick and simple guide to ordering food using SnagShack’s bot on your phone. Let’s get started!</strong>
      </p>
      <p>
        <strong className="font-bold">1. Pick Your Mobile Browser & Turn on VPN</strong>
        <br />
        First things first, don’t use the Uber Eats app! It won’t work for this. Instead, use one of these mobile browsers:
        <ul className="list-disc list-inside ml-4">
          <li>Brave Browser (Private Mode)</li>
          <li>DuckDuckGo Browser (Private Mode)</li>
        </ul>
        Now, before you start ordering, turn on your VPN. A VPN hides your location, so Uber Eats won’t know where you are. Connect to any state in the USA. Here are two VPNs we recommend:
        <ul className="list-disc list-inside ml-4">
          <li>Mullvad VPN</li>
          <li>Proton VPN</li>
        </ul>
        Make sure the VPN is running before you move on!
      </p>
      <p>
        <strong className="font-bold">2. Login to Uber Eats (Using the Browser)</strong>
        <br />
        Once your VPN is on, open the Uber Eats website using your mobile browser. Remember, don’t use the Uber Eats app; the browser is your best friend here! 
        <br />
        Now, log in with the account provided by SnagShack. If you’re not sure how, check the video guide for a walkthrough.
      </p>
      <p>
        <strong className="font-bold">3. Claim Your Promo Code</strong>
        <br />
        Once you’re logged in, you should see a promo code available for the account. Just accept it. This discount will save you money when you order!
      </p>
      <p>
        <strong className="font-bold">4. Choose Your Restaurant</strong>
        <br />
        Now it’s time to pick what you want to eat. Scroll through Uber Eats and select any restaurant you like. Almost all restaurants are available, so choose whatever you’re craving!
      </p>
      <p>
        <strong className="font-bold">5. Add Food to Your Cart</strong>
        <br />
        Add the items you want to your cart. Once you’re done, head to checkout.
        <br />
        <span className="italic">Tip: Your total should be under $5 after fees if you haven’t gone over the coupon value. Double-check your order total to make sure!</span>
      </p>
      <p>
        <strong className="font-bold">6. Add a Virtual Credit Card (VCC)</strong>
        <br />
        When you’re at the checkout page, you’ll need to add a Virtual Credit Card (VCC). This is the card you’ll use to pay. Here are two easy VCC options:
        <ul className="list-disc list-inside ml-4">
          <li>Apple Cash VCC</li>
          <li>Porte Bank VCC</li>
        </ul>
        You can find instructions for setting up a VCC in SnagShack’s guide. It’s super simple, so don’t worry!
      </p>
      <p>
        <strong className="font-bold">7. Set the Tip</strong>
        <br />
        To make sure your order gets picked up fast, set the tip to $1. This will ensure someone grabs your order while still keeping your total cost low.
      </p>
      <p>
        <strong className="font-bold">8. Place Your Order</strong>
        <br />
        Now that everything’s ready, hit Place Order! Your total should be under $5, and your food will be on its way. Enjoy the savings!
      </p>
      <p>
        <strong className="font-bold">9. Bonus: Place Another Order</strong>
        <br />
        Each account has two promos! After your first order, you can place a second one. Just follow the same steps again and enjoy another meal for less than $5.
      </p>
    </div>
  );
const computerGuide=(
    <div className="space-y-4 text-base text-white">
      <p>
        <strong className="font-bold">1. Choose a Browser & Turn on Your VPN</strong>
        <br />
        First, you’ll need to use a browser that keeps you private. Here are your best options:
        <ul className="list-disc list-inside ml-4">
          <li>Chrome Guest Mode</li>
          <li>Brave Private Browser</li>
          <li>DuckDuckGo Browser</li>
        </ul>
        Next, turn on your VPN (a tool that hides your location) and pick a place in the USA to connect. We suggest using:
        <ul className="list-disc list-inside ml-4">
          <li>Mullvad VPN</li>
          <li>Proton VPN</li>
        </ul>
        This is just to make sure everything goes smoothly!
      </p>
      <p>
        <strong className="font-bold">2. Log Into Your Uber Eats Account</strong>
        <br />
        Now that your VPN is on, log in to the Uber Eats account you got from SnagShack. If you’re not sure how, there’s a video that shows you what to do. It’s super easy!
      </p>
      <p>
        <strong className="font-bold">3. Get Your Promo Code</strong>
        <br />
        After logging in, there should be a promo code (a discount) waiting for you. Just click to accept it, and now you’re ready to save some cash!
      </p>
      <p>
        <strong className="font-bold">4. Pick Your Favorite Food!</strong>
        <br />
        Time to eat! Pick any store you like on Uber Eats. Almost any restaurant is available, so you can choose your favorite foods.
      </p>
      <p>
        <strong className="font-bold">5. Add Food to Your Cart</strong>
        <br />
        Look through the menu and add your favorite items to your cart. Then, go to checkout.
        <br />
        <span className="italic">Tip: Make sure your total after fees is under $5. If it’s more than that, you might have gone over the promo limit.</span>
      </p>
      <p>
        <strong className="font-bold">6. Add a Virtual Credit Card (VCC)</strong>
        <br />
        When you’re ready to pay, you’ll need to add a Virtual Credit Card (VCC). It’s like a special online card that you can use just for this. You can get one from:
        <ul className="list-disc list-inside ml-4">
          <li>Apple Cash</li>
          <li>Porte Bank</li>
        </ul>
        Check out the SnagShack guide if you need help. It’s super simple to set up!
      </p>
      <p>
        <strong className="font-bold">7. Change the Tip</strong>
        <br />
        Before you place your order, make sure to set the tip to $1 so someone will pick up your food. This way, your meal still costs under $5 but gets delivered quickly!
      </p>
      <p>
        <strong className="font-bold">8. Place Your Order</strong>
        <br />
        Hit Place Order! Yay! Now you’ve got a whole meal for under $5. Pretty awesome, right?
      </p>
      <p>
        <strong className="font-bold">9. Bonus Round: Place Another Order!</strong>
        <br />
        Guess what? You can place another order with the same account! Just go back and do everything again because each account has two promos. So, double the food fun!
      </p>
    </div>
  );
  const vccGuide = (
    <div className="space-y-4 text-base text-white-700">
      <p>
        <strong className="font-bold">What is a VCC?</strong>
        <br />
        A Virtual Credit Card (VCC) is like a regular credit card but digital. Instead of getting a physical card you can hold, a VCC gives you a special card number to use when shopping online. It helps keep your real credit card information safe by giving stores a temporary number instead of the one on your actual card. You can use it for one-time payments or subscriptions, and then the number can disappear or change.
      </p>
      <p>
        <strong className="font-bold">Here’s how you can use a VCC:</strong>
        <ol className="list-decimal list-inside ml-4">
          <li>Sign up for a VCC provider (some are free, others might charge a small fee).</li>
          <li>Get a virtual card number from the provider, which works just like a regular credit card number.</li>
          <li>Use the VCC number when you're shopping online. Enter it like you would any regular credit card number.</li>
          <li>Check your account to make sure you have enough money on the card, and complete your purchase!</li>
        </ol>
      </p>
      <p>
        <strong className="font-bold">What does SnagShack recommend you use?</strong>
        <br />
        SnagShack recommends you use APPLE CARD; everyone on iOS 17.4+ has access to APPLE VCC.
      </p>
      <p>
        <strong className="font-bold">How to set up Apple VCC:</strong>
        <ol className="list-decimal list-inside ml-4">
          <li>Open the Wallet app, then tap your Apple Cash card.</li>
          <li>Tap the More button, then tap Card Number.</li>
          <li>Tap Set Up Virtual Card Number, then tap Continue.</li>
          <li>Authenticate with Face ID, Touch ID, or your passcode.</li>
          <li>Tap Done.</li>
        </ol>
        <a href="https://support.apple.com/en-us/119943" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Learn more</a>
      </p>
      <p>
        <strong className="font-bold">Alternative Options: Top 3 VCC providers in the United States:</strong>
        <ol className="list-decimal list-inside ml-4">
          <li><a href="https://privacy.com" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Privacy</a></li>
          <li><a href="https://www.revolut.com" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Revolut</a></li>
          <li><a href="https://www.portebanking.com" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Evolve Bank & Trust (Porte)</a></li>
        </ol>
        These companies let you create virtual credit cards that help you stay safe when buying things online!
      </p>
    </div>
  );
  

  
const ContentBox = ({messages,setMessages,inputValue,setinputValue}) => {
    const { user } = useSelector(store => store.userReducer);
    const [currentEmail, setcurrentEmail] = useState("")
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false); // State to handhle navbar open/close
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState('login')
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        // Set breakpoint, e.g., 768px for mobile devices
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Call function on component mount
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
const details = [
    {
        path: Burger,
        title: 'Feeling Hungry',
        description: 'Enjoy discounted food now!',
        onSubmit:()=>{
            console.log("working")
            setinputValue("Send me Food")
            setMessages(prevMessages => [...prevMessages, {msg:"Send me Food","role":"user"}]);
          
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
                    toggleModal()
                    
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
        if("vcc" in question.lower()) {
            setMessages(prevMessages => [...prevMessages, {msg: vccGuide, "role": "bot"}]);
            return
        }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/gpt-result`,{messages,question});
         
        //   setResponseData(response.data);
        console.log("before data ",response)
        let responsereq=response.data.res.choices[0].message.content
        console.log(responsereq.replace(/```/g,"").replace("json","").replace("JSON",""))
        let jsonAnswer
        try{
            jsonAnswer=JSON.parse(responsereq.substring(responsereq.indexOf("{")));
        }
       catch{
                setMessages([...messages,{msg:responsereq,"role":"bot"}])
                return
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
            setMessages([...messages,{msg:"Hi your daily limit has been reached. Please come back tomorrow for some more food!","role":"bot"}])

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
            setMessages([...messages,{msg:jsonAnswer.answer,"role":"bot"}])
            setTimeout(() => {
                router.push('/pricing');
            }, 2000);
        }
        else{
            setMessages(prevMessages => [...prevMessages, {msg: jsonAnswer.answer, "role": "bot", attachment: jsonAnswer.attachment}]);

            setTimeout(() => {
                if(jsonAnswer.attachment && jsonAnswer.attachment === "video") {
                    if(isMobile) {
                        // Update the state using the function form to avoid overwriting
                        setMessages(prevMessages => [...prevMessages, {msg: mobileGuide, "role": "bot"}]);
                    } else {
                        // Update the state using the function form to avoid overwriting
                        setMessages(prevMessages => [...prevMessages, {msg: computerGuide, "role": "bot"}]);
                    }
                }
            }, 2000);
            
        }

        
      };

    const onSubmit=()=>{
       
        setMessages([...messages,{msg:inputValue,"role":"user",}])
        
      
    
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
                                        <Text content="Snag A Deal At The Shack!" customClass="text-center" />

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
                                        <Message sender={value.role} message={value.msg} attachment={value.attachment}/>
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