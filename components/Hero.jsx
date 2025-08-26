"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, PlayCircle, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedHovered, setIsExpandedHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const expandedContainerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);

  useEffect(() => {
    if (!isExpanded) return;

    const handleMouseMove = (e) => {
      if (!expandedContainerRef.current) return;
      const rect = expandedContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    };

    const node = expandedContainerRef.current;
    node?.addEventListener("mousemove", handleMouseMove);
    return () => node?.removeEventListener("mousemove", handleMouseMove);
  }, [isExpanded]);

  // Parallax effect for headings only (video parallax removed)
  useEffect(() => {
    if (heading1Ref.current) {
      gsap.to(heading1Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heading1Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
    if (heading2Ref.current) {
      gsap.to(heading2Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heading2Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  const handleVideoHover = (isHovering) => {
    setIsVideoHovered(isHovering);
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div>
      {/* Hero */}
      <header className="flex w-full flex-col px-[15] sm:px-[30] lg:px-[60] py-[90] gap-[30px]">
        {/* 1 heading */}
        <div className="w-full flex pb-[30]">
          <h1 ref={heading1Ref}>Where Nature</h1>
        </div>

        {/* video */}
        <div
          ref={videoContainerRef}
          className="relative w-full flex justify-center items-center"
        >
          {/* Inline video (initial state) */}
          <div
            className="relative rotate-[4deg] aspect-[16/9] max-xs:w-[180px] w-[240px] rounded-[4px] border-[1px] border-black-20 hover:border-black hover:border-[2px] hover:scale-[1.1] transition-all overflow-hidden cursor-pointer"
            onMouseEnter={() => handleVideoHover(true)}
            onMouseLeave={() => handleVideoHover(false)}
            onClick={() => setIsExpanded(true)}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full rounded-[8px] object-cover"
            >
              <source src="/main_white.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Solid white overlay with centered PlayCircle on hover */}
            <div
              className={`absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-200 ${
                isVideoHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Play size={30} color="rgba(32, 51, 32, 1)" />
            </div>
          </div>

          {/* Expanded fullscreen video */}
          {isExpanded && (
            <div className="fixed inset-0 z-[50] flex items-center justify-center p-[60px]">
              <div
                ref={expandedContainerRef}
                className="relative w-full h-full rounded-[12px] overflow-hidden shadow-2xl bg-black"
                onMouseEnter={() => setIsExpandedHovered(true)}
                onMouseLeave={() => setIsExpandedHovered(false)}
              >
                <video
                  autoPlay
                  loop
                  muted={!isExpandedHovered}
                  controls={isExpandedHovered}
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src="/main_white.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Close button that follows cursor */}
                <button
                  aria-label="Close video"
                  onClick={() => setIsExpanded(false)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 !rounded-[100px] !bg-white !text-black border border-black/10 !p-[12px] transition-opacity duration-150 hover:bg-gray-100 ${
                    isExpandedHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
                >
                  <X size={30} />
                </button>
              </div>
            </div>
          )}
          {/* 2 heading */}
        </div>
        <div className="pt-[30] w-full grid gap-[30] md:gap-[60] md:grid-cols-3 max-md:grid-rows-2 place-items-center">
          <div className="w-full md:col-span-1 max-md:row-start-2 grid place-items-start">
            <p className=" text-left max-md:max-w-[300px] md:max-w-[390px] ">
              Beast and Fur, a lively park where friendly animals roam and kids
              safely discover sea life while learning about nature through play.
            </p>
          </div>
          <h1 ref={heading2Ref} className="w-full text-right md:col-span-2">
            Roams Free
          </h1>
        </div>
        {/* <div className="w-full flex justify-between items-center flex-wrap gap-[30]">
          <p className="w-[390]">
            Beast and Fur, a lively park where friendly animals roam and kids
            safely discover sea life while learning about nature through play.
          </p>
          <h1>Roams Free</h1>
        </div> */}
      </header>
    </div>
  );
};

export default Hero;
