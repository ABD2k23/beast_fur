"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Land_Hero = ({ title, src, p }) => {
  const h4Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Text animation
    if (h4Ref.current) {
      // Split text into words
      const split = new SplitText(h4Ref.current, {
        type: "words",
        wordsClass: "word",
      });

      // Set initial state - words clipped and invisible (top to bottom)
      gsap.set(split.words, {
        clipPath: "inset(100% 0 0 0)",
        opacity: 0,
      });

      // Create timeline for smooth word-by-word reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: h4Ref.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate words one by one with clip-path reveal (quicker)
      tl.to(split.words, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }

    // Subtle parallax effect on image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, [p]);

  return (
    <div className="px-[15] sm:px-[30] lg:px-[60] max-lg:py-[60]  max-xs:gap-[30] py-[90] flex justify-center items-center max-lg:gap-[60] gap-[90] flex-col">
      <h1 className="w-full text-left">{title}</h1>
      <div className="flex items-end justify-end w-full flex-col max-md:gap-[90] gap-[210]">
        <div
          ref={imageRef}
          className="max-md:aspect-[3/4] aspect-[16/9] relative w-full max-md:max-w-none max-md:max-h-[600px] max-md:h-full max-w-[1200px] rounded-[4px] overflow-clip"
        >
          <Image className="object-cover" src={src} alt="Hello" fill={true} />
        </div>
        <div className="flex items-start justify-start  w-full max-md:max-w-[420px] max-xs:max-w-[320px] max-w-[1200px]">
          <h4
            ref={h4Ref}
            className="max-md:!text-[24px] max-xs:!text-[20px] !font-[400] w-full max-w-[1020] !leading-[130%] overflow-hidden"
          >
            {p}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Land_Hero;
