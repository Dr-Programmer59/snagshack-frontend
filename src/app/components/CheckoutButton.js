// CheckoutButton.js
"use client"
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const CheckoutButton = ({ productId }) => {
  const { user } = useSelector(store => store.userReducer);
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE}`);

  
  
  const handleCheckout = async () => {
    if(!user.payment_id){
      const stripe = await stripePromise;
      console.log(stripe)
      // Create a checkout session from the server
      const { data: { id } } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/create-checkout-session`, {
        productId: productId, // Price ID of the product
      });
  
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
      if (error) {
        console.error("Stripe Checkout Error:", error);
      }
    }
    else{
      toast.info('You Have already purchased this plan.', {
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
    <button 
    onClick={handleCheckout}
   
    className={`bg-white text-black font-inter font-semibold text-[15px] w-full py-[10px] my-[5px] `}
    >Purchase</button>
     
  );
};

export default CheckoutButton;
