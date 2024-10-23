"use client";

import React, { useState } from "react";

{
  /*Components*/
}
import Navbar from "../../components/navbar";
import Heading from "../../components/heading";
import Text from "../../components/text";
import PricingSwitch from "../../components/switch";
import PricingCard from "../../components/pricing-card";
import SuggestionCard from "../../components/suggestion-card";
import Footer from "../../components/footer";
import PricingTable from '../../components/pricing-table'
import CheckoutButton from "@/app/components/CheckoutButton";
{
  /*Images*/
}
import Burger from "../../../../public/burger.png";
import Cash from "../../../../public/cash.png";
import Building from "../../../../public/building.png";
import Art from "../../../../public/art.png";
import { useSelector } from 'react-redux';



const Page = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const { user } = useSelector(store => store.userReducer);
  const handleToggle = () => {
    setIsMonthly((prev) => !prev);
  };
  const details = [
    {
      path: Burger,
      title: "Feeling Hungry",
      description: "Enjoy discounted food now!",
    },
    {
      path: Cash,
      title: "Sign up now",
      description: "Don’t miss out on these amazing promos!.",
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
      path: Building,
      title: "Coming Soon",
      description: "",
    },
    {
      path: Art,
      title: "Coming Soon",
      description: "",
    },
  ];
  const pricingData = [
    { name: "Basic", monthlyPrice: 59, yearlyPrice: 100 },
     { name: "Coming Soon", monthlyPrice: 30, yearlyPrice: 300 },
  ];

  return (
    <div className="flex flex-col items-center gap-y-[20px] md:px-[10px]">
      <Navbar />
      <div className="flex flex-col gap-y-5 mt-[60px]">
        <Heading text="Our Pricing " />
        {/* <Text
          content="Lorem ipsum dolor set amet consectetur adipsicing dolor set"
          customClass="text-center"
        /> */}
        {/* <div className="flex justify-center items-center w-full h-auto">
          <PricingSwitch isMonthly={isMonthly} onToggle={handleToggle} />
        </div> */}
      </div>

      <div className="w-full flex flex-row justify-center items-center gap-x-[40px] flex-wrap p-[20px] gap-y-5">
        {pricingData.map((plan, index) => (
          <PricingCard
            key={index}
            name={plan.name}
            price={isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
            duration={isMonthly ? "month" : "year"}
            buttonCustomClass={
              plan.name === "Pro"
                ? "bg-primary text-black"
                : "bg-white text-black"
            }
            customClass={plan.name === "Pro" ? "border border-primary" : ""}
          />
        ))}
      </div>

      {/* <PricingTable /> */}


      <Heading text="Choose your adventure today" customClass="mb-3" />
      <div className="flex flex-wrap gap-5 justify-center px-[10px] py-[50px]">
        {details.map((detail) => {
          return (
            <SuggestionCard
              imgPath={detail.path}
              title={detail.title}
              description={detail.description}
              onSubmit={details.onSubmit}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
