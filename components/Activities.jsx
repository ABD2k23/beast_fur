// Filename: /app/components/Activities.jsx
"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Activities = () => {
  const activity = [
    { src: "/active_1.jpg", title: "Guided Nature Walks" },
    { src: "/active_2.jpg", title: "Feeding Sessions" },
    { src: "/active_3.jpg", title: "Marine Life Observation" },
    { src: "/home_kids_2.jpg", title: "Story in the Wild" },
  ];

  // store refs for each card
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const img = card.querySelector(".activity-img");
      const overlay = card.querySelector(".activity-overlay");
      const text = card.querySelector(".activity-text");

      // mouse enter
      card.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.08, duration: 0.5, ease: "power3.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(text, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
      });

      // mouse leave
      card.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.5, ease: "power3.out" });
        gsap.to(text, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
      });
    });
  }, []);

  return (
    <div
      className="w-full px-[15] sm:px-[30] lg:px-[60] flex justify-center flex-col items-center gap-[90px]"
      id="activities"
    >
      <h2>Activities</h2>
      <div className="w-full flex justify-center gap-[30px] items-center flex-wrap">
        {activity.map((act, id) => (
          <div
            key={id}
            className="relative cursor-crosshair"
            ref={(el) => (cardsRef.current[id] = el)}
          >
            {/* image wrapper */}
            <div className="relative w-[320px] max-xs:w-[290px] max-xs:h-[360px] h-[420px] rounded-[4px] overflow-hidden">
              {/* Overlay */}
              <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-[rgba(15,20,15,0)] to-[rgba(15,20,15,0.5)] activity-overlay"></div>
              <Image
                className="object-cover activity-img"
                src={act.src}
                alt={act.title}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <h6 className="!text-white z-20 text-center w-full absolute bottom-[15px] left-[50%] translate-x-[-50%] activity-text">
              {act.title}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
