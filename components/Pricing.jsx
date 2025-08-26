"use client";
import React from "react";
import Link from "next/link";

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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 12C6.78793 12 7.56815 11.8448 8.2961 11.5433C9.02405 11.2417 9.68549 10.7998 10.2426 10.2426C10.7998 9.68549 11.2417 9.02405 11.5433 8.2961C11.8448 7.56815 12 6.78793 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02405 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 -1.17411e-08 6 0C4.4087 2.37122e-08 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12ZM4.8 3.6L6 4.8L7.2 3.6L8.4 4.8L7.2 6L8.4 7.2L7.2 8.4L6 7.2L4.8 8.4L3.6 7.2L4.8 6L3.6 4.8L4.8 3.6Z"
      fill="#C0C0C0"
    />
  </svg>
);

const pricingPlans = [
  {
    id: "explorer",
    title: "Explorer",
    price: "$40 per person",
    priceValue: 40,
    duration: "3-Hour Tour",
    features: [
      { name: "Access to Land Zone", included: true },
      { name: "Access to Water Zone", included: true },
      { name: "Access to Kids Play Zone", included: true },
      { name: "Guided Nature Walk", included: true },
      { name: "Private Guide", included: true },
      { name: "Snacks/Meals", included: false },
      { name: "Feeding Sessions", included: false },
      { name: "Personalized Activity Plan", included: false },
      { name: "Discount at Gift Shop", included: false },
      { name: "Touch Animals", included: false },
      { name: "Bonfire", included: false },
      { name: "Night Safari", included: false },
    ],
  },
  {
    id: "adventurer",
    title: "Adventurer",
    price: "$120 per person",
    priceValue: 120,
    duration: "1-Day Adventure",
    tag: "Suggested for Best Experience",
    features: [
      { name: "Access to Land Zone", included: true },
      { name: "Access to Water Zone", included: true },
      { name: "Access to Kids Play Zone", included: true },
      { name: "Guided Nature Walk", included: true },
      { name: "Private Guide", included: true },
      { name: "Snacks/Meals", included: true },
      { name: "Feeding Sessions", included: true },
      { name: "Personalized Activity Plan", included: true },
      { name: "Discount at Gift Shop", included: true },
      { name: "Touch Animals", included: false },
      { name: "Bonfire", included: false },
      { name: "Night Safari", included: false },
    ],
  },
  {
    id: "wildlife-plus",
    title: "Wildlife+",
    price: "$300 per person",
    priceValue: 300,
    duration: "3-Day Adventure",
    features: [
      { name: "Access to Land Zone", included: true },
      { name: "Access to Water Zone", included: true },
      { name: "Access to Kids Play Zone", included: true },
      { name: "Guided Nature Walk", included: true },
      { name: "Private Guide", included: true },
      { name: "Snacks/Meals", included: true },
      { name: "Feeding Sessions", included: true },
      { name: "Personalized Activity Plan", included: true },
      { name: "Discount at Gift Shop", included: true },
      { name: "Touch Animals", included: true },
      { name: "Bonfire", included: true },
      { name: "Night Safari", included: true },
    ],
  },
];

export default function Page() {
  return (
    <div
      className="flex flex-col justify-center items-center gap-[90] py-[210] px-[15] sm:px-[30] lg:px-[60]"
      id="pricing"
    >
      <h2>Pricing</h2>
      <div className="flex justify-center items-center flex-wrap gap-[90px] w-full">
        {pricingPlans.map((plan, idx) => (
          <div
            key={idx}
            className="group w-full max-w-[360px] relative rounded-[4px] bg-[rgba(15,20,15,0.03)] py-[45px] px-[30px] border border-black-20 flex flex-col"
          >
            {plan.tag && (
              <div className="text-center w-[76%] sm !text-white absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-sm px-[15px] py-2 rounded-[4px]">
                {plan.tag}
              </div>
            )}

            <h4>{plan.title}</h4>
            <div className="flex justify-between items-center pt-[30px]">
              <p className="sm">{plan.price}</p>
              <p className="sm">{plan.duration}</p>
            </div>

            <ul className="space-y-3.5 flex-1 py-[60px]">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center text-sm">
                  {feature.included ? <TickIcon /> : <CrossIcon />}
                  <span
                    className={`sm !font-[600] ml-2 ${
                      feature.included
                        ? "text-primary"
                        : "!text-[rgba(15,20,15,0.3)]"
                    }`}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={{
                pathname: "/Details",
                query: {
                  plan: plan.id,
                  name: plan.title,
                  price: plan.priceValue,
                  duration: plan.duration,
                },
              }}
            >
              <button className="w-full !bg-transparent !text-black hover:!bg-primary hover:!text-white group-hover:scale-[1.04] transition-all border border-black-40">
                Select and Proceed
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
