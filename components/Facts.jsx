import { RefreshCcw } from "lucide-react";
import React from "react";

const Facts = () => {
  return (
    <div
      id="facts"
      className="w-full px-[15] sm:px-[30] lg:px-[60] py-[120] flex justify-center items-center gap-[90] max-xs:gap-[30] flex-col rounded-[4]"
    >
      <h4 className="max-xs:text-left text-center w-full">Facts</h4>
      <div className="bg-accent max-xs:p-[15] p-[30] flex justify-between items-center rounded-[6] w-full max-w-[900]">
        <h6 className="!text-white !leading-[140%]">
          A lion’s roar can be heard from 8 km away!
        </h6>
      </div>
    </div>
  );
};

export default Facts;
