// /app/choose-plan/page.js

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const plans = [
  {
    id: "explorer",
    name: "Explorer",
    price: 40,
    duration: "3-Hour Tour",
    features: [
      { text: "Access to Land Zone", available: true },
      { text: "Access to Water Zone", available: true },
      { text: "Access to Kids Play Zone", available: true },
      { text: "Guided Nature Walk", available: true },
      { text: "Private Guide", available: true },
      { text: "Snacks/Meals", available: false },
      { text: "Feeding Sessions", available: false },
      { text: "Personalized Activity Plan", available: false },
      { text: "Discount at Gift Shop", available: false },
      { text: "Touch Animals", available: false },
      { text: "Bonfire", available: false },
      { text: "Night Safari", available: false },
    ],
  },
  {
    id: "adventurer",
    name: "Adventurer",
    price: 120,
    duration: "1-Day Adventure",
    features: [
      { text: "Access to Land Zone", available: true },
      { text: "Access to Water Zone", available: true },
      { text: "Access to Kids Play Zone", available: true },
      { text: "Guided Nature Walk", available: true },
      { text: "Private Guide", available: true },
      { text: "Snacks/Meals", available: true },
      { text: "Feeding Sessions", available: true },
      { text: "Personalized Activity Plan", available: true },
      { text: "Discount at Gift Shop", available: true },
      { text: "Touch Animals", available: false },
      { text: "Bonfire", available: false },
      { text: "Night Safari", available: false },
    ],
  },
  {
    id: "wildlife-plus",
    name: "Wildlife+",
    price: 300,
    duration: "3-Day Adventure",
    features: [
      { text: "Access to Land Zone", available: true },
      { text: "Access to Water Zone", available: true },
      { text: "Access to Kids Play Zone", available: true },
      { text: "Guided Nature Walk", available: true },
      { text: "Private Guide", available: true },
      { text: "Snacks/Meals", available: true },
      { text: "Feeding Sessions", available: true },
      { text: "Personalized Activity Plan", available: true },
      { text: "Discount at Gift Shop", available: true },
      { text: "Touch Animals", available: true },
      { text: "Bonfire", available: true },
      { text: "Night Safari", available: true },
    ],
  },
];

const TickIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 12C6.78793 12 7.56815 11.8448 8.2961 11.5433C9.02405 11.2417 9.68549 10.7998 10.2426 10.2426C10.7998 9.68549 11.2417 9.02405 11.5433 8.2961C11.8448 7.56815 12 6.78793 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02405 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 -1.17411e-08 6 0C4.4087 2.37122e-08 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12ZM5.84533 8.42667L9.17867 4.42667L8.15467 3.57333L5.288 7.01267L3.80467 5.52867L2.862 6.47133L4.862 8.47133L5.378 8.98733L5.84533 8.42667Z"
      fill="#203320"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M10.2748 1.75062C7.93481 -0.583541 4.0949 -0.583541 1.75496 1.75062C-0.584986 4.08479 -0.584986 7.91521 1.75496 10.2494C4.0949 12.5835 7.87481 12.5835 10.2148 10.2494C12.5547 7.91521 12.6147 4.08479 10.2748 1.75062ZM7.69482 8.51372L6.01486 6.8379L4.3349 8.51372L3.49492 7.67581L5.17488 6L3.49492 4.32419L4.3349 3.48628L6.01486 5.16209L7.69482 3.48628L8.5348 4.32419L6.85484 6L8.5348 7.67581L7.69482 8.51372Z"
      fill="#0F140F"
      fillOpacity="0.2"
    />
  </svg>
);

export default function ChoosePlan() {
  return (
    <div className="flex flex-col bg-white text-black">
      {/* Header */}
      <Nav st1={true} st2={false} st3={false} />
      {/* Title */}
      <div className="py-[90] px-[15] sm:px-[30] lg:px-[60]">
        <h2>Choose Your Plan</h2>
      </div>

      {/* Plans */}
      <div className="w-full flex flex-col">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="w-full border-b border-black-15 px-[15] sm:px-[30] lg:px-[60] py-[90] flex items-start justify-between max-lg:flex-col max-lg:gap-[60] gap-[90] "
          >
            {/* Plan Info */}
            <div className=" flex flex-col gap-[30] min-w-[280]">
              <h4>{plan.name}</h4>
              <div className="w-full flex justify-between items-center">
                <p className="sm">{plan.duration}</p>
                <p className="sm">${plan.price} per person</p>
              </div>
            </div>

            {/* Features */}
            <div className="w-full">
              <ul className="flex flex-wrap w-full gap-[15]">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-2 text-sm w-[240]"
                  >
                    {f.available ? <TickIcon /> : <CrossIcon />}
                    <span
                      className={
                        f.available ? "text-[#203320]" : "text-gray-400"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Select Button */}
            <div>
              <Link
                href={{
                  pathname: "/Details",
                  query: {
                    plan: plan.id,
                    name: plan.name,
                    price: plan.price,
                    duration: plan.duration,
                  },
                }}
              >
                <button className="w-full">Proceed</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
