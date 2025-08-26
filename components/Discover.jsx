// /components/Discover.js
"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Discover = ({ images }) => {
  const refs = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // you can adjust breakpoint

    refs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");

      if (isMobile) {
        // mobile: final state, no hover animation
        gsap.set(img, { scale: 1.05, filter: "blur(0px)" });
      } else {
        // desktop: initial state + hover animations
        gsap.set(img, { scale: 0.9, filter: "blur(2px)" });

        const enter = () => {
          gsap.to(img, {
            scale: 1.05,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(img, {
            scale: 0.9,
            filter: "blur(2px)",
            duration: 0.6,
            ease: "power3.out",
          });
        };

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);

        // cleanup
        return () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        };
      }
    });
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div
      id="discover"
      className="px-[15] sm:px-[30] lg:px-[60] py-[210] flex flex-col justify-center items-center gap-[90]"
    >
      <h2>What You’ll Discover</h2>
      <div className="flex flex-wrap items-center justify-center gap-[60]">
        {images.map((img, idx) => (
          <div
            key={idx}
            ref={(el) => (refs.current[idx] = el)}
            className="cursor-crosshair border p-[15] border-black-10 w-[280px] h-[380px] overflow-hidden relative rounded-[4px]"
          >
            <Image
              className="object-cover w-full h-full"
              src={img.src}
              alt="Your Network is Slow! Reload"
              fill
            />
          </div>
        ))}
      </div>
      <p className="sm !text-accent">and much more....</p>
    </div>
  );
};

export default Discover;
