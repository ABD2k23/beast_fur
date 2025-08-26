// /components/Footer.js
"use client";

import { LucideArrowBigUp } from "lucide-react";
import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-primary w-full !text-white px-[15] sm:px-[30] lg:px-[60] py-[30] flex gap-[60] flex-col">
      <button
        onClick={scrollToTop}
        className="!bg-white !text-black w-fit p-2 rounded-full hover:opacity-80 transition"
      >
        <LucideArrowBigUp />
      </button>

      <div className="flex justify-between items-center w-full flex-row max-lg:items-start max-lg:flex-col gap-[15]">
        <p className="!text-[rgba(240,245,240,0.8)] sm !font-[400]">
          © 2025 Beast and Fur. All rights reserved. | Privacy Policy | Terms &
          Conditions
        </p>
        <p className="!text-[rgba(240,245,240,0.8)] sm !font-[400]">
          Website Designed and Developed By Muhammad Abdullah
        </p>
      </div>
    </div>
  );
};

export default Footer;
