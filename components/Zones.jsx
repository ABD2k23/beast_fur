"use client";
import React, { useRef, useEffect } from "react";
import Zone from "./Zone";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Zones() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const zones = [
    {
      title: "Land Zone",
      ln1: "Over 60 Mammal Species",
      ln2: "Up to 52 Species of Birds",
      ln3: "Over 25 Reptile Species",
      src_1: "/home_land_1.jpg",
      src_2: "/home_land_2.webp",
      lnk: "/Land",
    },
    {
      lnk: "/Water",
      title: "Water Zone",
      ln1: "Over 40 Freshwater Fish",
      ln2: "Up to 15 Amphibians Species",
      ln3: "Over 25 Saltwater Fish Species",
      src_1: "/home_water_1.webp",
      src_2: "/home_water_2.jpg",
    },
    {
      lnk: "/Kids",
      title: "Kids Ground",
      ln1: "Safe And Fully Fenced",
      ln2: "Animal Themed Slides",
      ln3: "Supervised play hours",
      src_1: "/home_kids_1.jpg",
      src_2: "/home_kids_2.jpg",
    },
  ];

  useEffect(() => {
    // Simple scale-up animation for heading
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        scale: 0.8,
        opacity: 0,
      });

      gsap.to(headingRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Image blur animations
    const images = sectionRef.current?.querySelectorAll("img");
    if (images) {
      images.forEach((img) => {
        // Set initial blur state
        gsap.set(img, {
          filter: "blur(15px)",
          opacity: 0.7,
          y: 30,
        });

        // Animate images on scroll
        gsap.to(img, {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-[210] max-sm:py-[120]" id="zones">
      {/* Header */}
      <h4
        ref={headingRef}
        className="px-[15] sm:px-[30] lg:px-[60] text-center w-full"
      >
        Explore Zones
      </h4>

      {/* Zones */}
      <div className="pt-[150] max-sm:pt-[90]">
        {zones.map((zone, index) => (
          <div key={index}>
            <Zone
              src_1={zone.src_1}
              src_2={zone.src_2}
              ln_1={zone.ln1}
              ln_2={zone.ln2}
              ln_3={zone.ln3}
              title={zone.title}
              lnk={zone.lnk}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
