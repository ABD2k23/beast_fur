import React from "react";

const Safety = ({ points }) => {
  if (!points || points.length === 0) return null;
  return (
    <div className="flex flex-col items-center justify-center max-xs:gap-[30] gap-[60] px-[15] sm:px-[30] lg:px-[60] pb-[90]">
      <h4 className="max-xs:text-left text-center w-full">
        Safety and Interaction
      </h4>
      <div className="flex justify-center items-center flex-col max-xs:gap-[15] gap-[30] w-full">
        {points.map((pt, idx) => (
          <h6
            className="rounded-[4] max-xs:text-left !leading-[140%] text-center !text-white bg-accent py-[15] px-[15] w-full max-w-[900]"
            key={idx}
          >
            {pt.pt}
          </h6>
        ))}
      </div>
    </div>
  );
};

export default Safety;
