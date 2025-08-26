import Link from "next/link";
import React from "react";

const Nav = ({ st1, st2, st3 }) => {
  return (
    <div className="border-b border-black-15 py-[30] w-full">
      <div className="px-[15] sm:px-[30] lg:px-[60] w-full space-x-4 flex justify-between items-center gap-[60] max-sm:flex-col max-sm:gap-[20] ">
        <Link className="max-sm:w-full" href="/">
          <button className="w-full">Home</button>
        </Link>
        <div className="w-full max-w-[900] grid place-items-center grid-cols-3 ">
          {/* 1 */}

          <div className="flex items-center justify-center  gap-[10] w-fit">
            <span
              className={`w-[8px] h-[8px] rounded-full block ${
                st1 === true
                  ? "bg-accent border-none"
                  : "border border-accent bg-transparent"
              }`}
            ></span>
            <p className="sm w-fit">Choose Your Plan</p>
          </div>

          {/* 2 */}

          <div className=" flex items-center justify-center gap-[10] w-fit">
            <span
              className={`w-[8px] h-[8px] rounded-full block ${
                st2 === true
                  ? "bg-accent border-none"
                  : "border border-accent bg-transparent"
              }`}
            ></span>
            <p className="sm w-fit">Details</p>
          </div>

          {/* 3 */}

          <div className=" flex items-center justify-center gap-[10] w-fit">
            <span
              className={`w-[8px] h-[8px] rounded-full block ${
                st3 === true
                  ? "bg-accent border-none"
                  : "border border-accent bg-transparent"
              }`}
            ></span>
            <p className="sm w-fit">Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
