import Image from "next/image";
import React from "react";

const Share = () => {
  return (
    <div
      className=" flex flex-col items-center justify-center px-[15] sm:px-[30] lg:px-[60] gap-[90px] max-xl:gap-[30px]"
      id="share"
    >
      <h2 className="max-xl:text-left text-center w-full">
        Share Your Moments
      </h2>
      <div className="flex items-center flex-row max-xl:flex-col w-full justify-center gap-[90] max-xl:gap-[30px]">
        <div className="flex flex-col max-xl:max-w-none max-w-[390] items-start w-full justify-center gap-[30] ">
          <p className="w-full max-xl:max-w-[420]">
            Beast and Fur becomes magical through your experiences. From your
            child's first deer feeding to a serene stroll with sea creatures, we
            want to see the park through your eyes.
          </p>
          {/* PT 1 */}
          <div className="w-full flex justify-center items-start gap-[15] flex-col">
            <h6>What You Can Share</h6>
            <ul className="list-inside list-disc">
              <li>Photos or videos of your visit</li>
              <li>Feedback and testimonials</li>
              <li>A short message or memory</li>
            </ul>
          </div>
          {/* PT 2 */}
          <div className="w-full flex justify-center items-start gap-[15] flex-col">
            <h6>How to Share</h6>
            <ul className="list-inside list-disc">
              <li>Tag us on social media using #BeastAndFur</li>
              <li>Or email it to: share@beastandfur.pk</li>
            </ul>
          </div>
        </div>

        <div className="aspect-[16/9] relative w-full max-w-[1200px] rounded-[4px] overflow-clip">
          <Image
            className="object-cover"
            src="/home_share.webp"
            alt="Hello"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Share;
