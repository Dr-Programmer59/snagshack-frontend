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

{
  /*Images*/
}
import Burger from "../../../../public/burger.png";
import Cash from "../../../../public/cash.png";
import Building from "../../../../public/building.png";
import Art from "../../../../public/art.png";

const details = [
  {
    path: Burger,
    title: "Feeling Hungry",
    description: "Let us pick our top reccomendations",
  },
  {
    path: Cash,
    title: "Feeling Cheap",
    description: "Let us pick our top reccomendations",
  },
  {
    path: Building,
    title: "Stressed Out",
    description: "Let us pick our top reccomendations",
  },
  {
    path: Art,
    title: "Feeling Creative",
    description: "Let us pick our top reccomendations",
  },
];

const Page = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleToggle = () => {
    setIsMonthly((prev) => !prev);
  };

  const pricingData = [
    { name: "Basic", monthlyPrice: 59, yearlyPrice: 100 },
    // { name: "Pro", monthlyPrice: 30, yearlyPrice: 300 },
  ];

  return (
    <div className="flex flex-col items-center gap-y-[20px] md:px-[10px]">
      <Navbar />
      <div className="flex flex-col gap-y-5 mt-[60px]">
        <Heading text="Our Pricing " />
        <Text
          content="Lorem ipsum dolor set amet consectetur adipsicing dolor set"
          customClass="text-center"
        />
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


      <PricingTable />


      <Heading text="Choose your adventure today" customClass="mb-3" />
      <div className="flex flex-wrap gap-5 justify-center px-[10px] py-[50px]">
        {details.map((detail) => {
          return (
            <SuggestionCard
              imgPath={detail.path}
              title={detail.title}
              description={detail.description}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
