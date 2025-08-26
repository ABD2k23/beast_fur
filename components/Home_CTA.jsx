"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ImageCursorTrail from "./ui/image-cursortrail";

const Home_CTA = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports touch
    const checkTouchDevice = () => {
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouchScreen);
    };

    checkTouchDevice();

    // Re-check on resize in case of orientation changes
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const images = isTouchDevice
    ? []
    : [
        "./home_land_2.webp",
        "./home_water_2.jpg",
        "./home_land_1.jpg",
        "./home_water_1.webp",
        "./home_kids_1.jpg",
        "./home_kids_2.jpg",
      ];

  return (
    <ImageCursorTrail
      items={images}
      maxNumberOfImages={4}
      distance={20}
      imgClass="sm:w-40 w-28 sm:h-48 h-36 "
      className=" w-full rounded-3xl"
    >
      <div className="px-[15] sm:px-[30] lg:px-[60] relative z-50 flex flex-col items-center gap-[60] justify-center">
        <h1 className="text-center w-full ">Adventure Awaits</h1>
        <Link href={"/Plan"}>
          <button className="button_big">Book Your Tour</button>
        </Link>
      </div>
    </ImageCursorTrail>
  );
};

export default Home_CTA;
