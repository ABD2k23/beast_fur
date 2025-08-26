import Image from "next/image";
import Link from "next/link";
import React from "react";

const Zone = ({ src_1, ln_1, ln_2, ln_3, title, src_2, lnk }) => {
  const dash = () => (
    <span>
      <svg
        width="15"
        height="2"
        viewBox="0 0 15 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H15" stroke="#F46A22" strokeWidth="2" />
      </svg>
    </span>
  );
  return (
    <div className="px-[15] sm:px-[30] lg:px-[60] pb-[150] md:pb-[90] w-full flex flex-row max-md:flex-col justify-between max-md:justify-center gap-[150] max-lg:gap-[60] items-start">
      {/* Left main image */}
      <div className="relative w-full max-sm:max-w-[210px] max-sm:h-[300px] max-xl:max-w-[320px] max-xl:h-[420px] max-w-[420px] h-[520px] rounded-[6px] overflow-clip">
        <Image className="object-cover" src={src_1} alt={title} fill={true} />
      </div>
      {/* Right Side */}
      <div className="md:pt-[300] flex justify-center max-xl:w-full flex-col items-start gap-[30] md:gap-[60]">
        <h1>{title}</h1>

        <div className="w-full flex justify-between max-xs:flex-col flex-row max-xs:gap-[30] items-start">
          <div className="flex justify-center flex-col items-start gap-[60]">
            <Link scroll={true} href={lnk}>
              <button className="button_big">Explore</button>
            </Link>
            <ul className="flex justify-center flex-col items-start gap-[8]">
              <li className="flex justify-center items-center gap-[15]">
                {dash()}
                {ln_1}
              </li>
              <li className="flex justify-center items-center gap-[15]">
                {dash()}
                {ln_2}
              </li>
              <li className="flex justify-center items-center gap-[15]">
                {dash()}
                {ln_3}
              </li>
            </ul>
          </div>
          {/* Right Image */}
          <div className="w-full max-xs:max-w-none max-lg:max-w-[210px] max-w-[320px] h-[420px] max-xs:flex max-xs:justify-end">
            <div className="relative w-full max-lg:max-w-[210px] max-lg:h-[300px] max-w-[320px] h-[420px] rounded-[6px] overflow-clip">
              <Image
                className="object-cover"
                src={src_2}
                alt={title}
                fill={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zone;
