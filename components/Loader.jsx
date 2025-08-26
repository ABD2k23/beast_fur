"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    if (!overlay || !counter) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      overlay.style.display = "none";
      return;
    }

    // Fade in counter
    gsap.fromTo(
      counter,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate count from 1 to 100
    gsap.to(
      { val: 1 },
      {
        val: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].val));
        },
        onComplete: () => {
          // Fade out overlay
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              overlay.style.display = "none";
            },
          });
        },
      }
    );
  }, [mounted]);

  return (
    <div
      ref={overlayRef}
      className="loader fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{ transition: "opacity 0.7s" }}
    >
      {mounted && (
        <h1
          ref={counterRef}
          className="select-none !text-white"
          style={{
            opacity: 1,
            letterSpacing: "0.05em",
          }}
        >
          {count}
        </h1>
      )}
    </div>
  );
};

export default Loader;
