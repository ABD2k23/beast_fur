"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navbar = ({ link1, src1, link2, src2, link3, src3, link4, src4 }) => {
  const [nav, setNav] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuButtonRef = useRef(null);

  // Store menu item refs in an array
  menuItemsRef.current = [];

  const addToMenuItemsRef = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  const handleNav = () => {
    // Button click feedback animation
    gsap.to(menuButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    setNav(!nav);
  };

  // Initial setup
  useEffect(() => {
    // Set initial position to be off-screen to the right
    gsap.set(mobileMenuRef.current, { x: "100%" });
  }, []);

  // Handle nav state changes
  useEffect(() => {
    if (nav) {
      // Prevent body scrolling
      document.body.style.overflow = "hidden";

      // Open animation
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Animate menu items with a stagger effect
      gsap.from(menuItemsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Animate the menu button rotation
      gsap.to(menuButtonRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Restore body scrolling
      document.body.style.overflow = "auto";

      // Close animation
      gsap.to(mobileMenuRef.current, {
        x: "120%",
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Reset menu button rotation
      gsap.to(menuButtonRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [nav]);

  // Handle scroll to close menu
  useEffect(() => {
    const handleScroll = () => {
      if (nav) {
        setNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nav]);

  return (
    <div>
      <nav className="px-[15] sm:px-[30] lg:px-[60] py-[30px] flex justify-between items-center w-full border-[transparent] border-b-black-15 border-[1px]">
        {/* Logo */}
        <div>
          <svg
            width="119"
            height="18"
            viewBox="0 0 119 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.232 17.48L0.136 15.008L4.624 3.512L4.216 1.88C5.048 1.528 5.928 1.232 6.856 0.991999C7.8 0.751999 8.736 0.567999 9.664 0.439999C10.608 0.311999 11.488 0.231999 12.304 0.199999L13.48 3.128C13.032 4.248 12.44 5.344 11.704 6.416C10.968 7.488 10.168 8.488 9.304 9.416L13.504 8.48L14.176 11.336C13.2 12.92 12.152 14.152 11.032 15.032C9.928 15.896 8.728 16.512 7.432 16.88C6.152 17.232 4.752 17.432 3.232 17.48ZM6.208 9.8C7.152 8.904 8.088 7.832 9.016 6.584C9.96 5.32 10.76 3.928 11.416 2.408L7.312 3.416L2.944 15.272C4.784 15.192 6.48 14.784 8.032 14.048C9.584 13.312 10.848 12.152 11.824 10.568L6.496 11.696L6.208 9.8ZM22.8106 15.416L17.0266 17.504L14.6266 16.208C14.5466 14.816 14.6586 13.512 14.9626 12.296C15.2666 11.064 15.7226 9.976 16.3306 9.032C16.9546 8.072 17.6746 7.296 18.4906 6.704C19.3226 6.096 20.2186 5.696 21.1786 5.504L24.2746 7.016L22.6186 11.84L17.6026 12.992C17.4906 13.36 17.3946 13.744 17.3146 14.144C17.2506 14.544 17.2186 14.952 17.2186 15.368L22.3066 13.688L22.8106 15.416ZM18.0826 11.624L20.9146 10.952L21.9706 7.256C21.1546 7.656 20.4106 8.24 19.7386 9.008C19.0666 9.76 18.5146 10.632 18.0826 11.624ZM32.9903 17.48L30.6863 16.4L32.4863 10.808L27.8303 17.48L24.1583 16.184C24.1423 15.224 24.2623 14.256 24.5183 13.28C24.7583 12.304 25.1023 11.368 25.5503 10.472C25.9983 9.576 26.5183 8.768 27.1103 8.048C27.7023 7.328 28.3423 6.744 29.0303 6.296C29.7343 5.848 30.4623 5.584 31.2143 5.504L33.6143 7.688L34.4063 5.696L36.5183 6.44L32.9903 17.48ZM32.5583 8.816L31.3583 7.808C30.8143 8.112 30.3023 8.504 29.8223 8.984C29.3423 9.448 28.9023 9.992 28.5023 10.616C28.1023 11.24 27.7503 11.912 27.4463 12.632C27.1423 13.336 26.8943 14.096 26.7023 14.912L27.5663 15.32L32.5583 8.816ZM39.5155 17.48C38.9875 17.48 38.4035 17.432 37.7635 17.336C37.1395 17.24 36.4755 17.096 35.7715 16.904L35.9635 15.128H41.5555V14.096C40.5955 14 39.7315 13.832 38.9635 13.592C38.2115 13.352 37.5155 13.04 36.8755 12.656C37.0515 11.792 37.3315 10.96 37.7155 10.16C38.1155 9.344 38.5955 8.608 39.1555 7.952C39.7155 7.296 40.3315 6.752 41.0035 6.32C41.6755 5.888 42.3795 5.616 43.1155 5.504L46.2115 7.016L44.6995 11.384L42.8755 11.072L43.4515 7.424C42.7315 7.808 42.0355 8.392 41.3635 9.176C40.7075 9.944 40.1875 10.872 39.8035 11.96L43.4035 13.136L43.4755 16.016C43.0435 16.496 42.4915 16.856 41.8195 17.096C41.1635 17.352 40.3955 17.48 39.5155 17.48ZM52.6278 15.896L48.1878 17.504L45.7637 16.208L49.1478 7.568H47.6598L48.0678 5.984H49.7718L50.9238 3.032L53.1558 3.92L52.3878 5.984H55.0038L54.4998 7.568H51.7878L48.9558 15.224L52.0518 14.096L52.6278 15.896ZM57.3514 17.48C56.8234 17.48 56.2394 17.432 55.5994 17.336C54.9754 17.24 54.3114 17.096 53.6074 16.904L53.7994 15.128H59.3914V14.096C58.4314 14 57.5674 13.832 56.7994 13.592C56.0474 13.352 55.3514 13.04 54.7114 12.656C54.8874 11.792 55.1674 10.96 55.5514 10.16C55.9514 9.344 56.4314 8.608 56.9914 7.952C57.5514 7.296 58.1674 6.752 58.8394 6.32C59.5114 5.888 60.2154 5.616 60.9514 5.504L64.0474 7.016L62.5354 11.384L60.7114 11.072L61.2874 7.424C60.5674 7.808 59.8714 8.392 59.1994 9.176C58.5434 9.944 58.0234 10.872 57.6394 11.96L61.2394 13.136L61.3114 16.016C60.8794 16.496 60.3274 16.856 59.6554 17.096C58.9994 17.352 58.2314 17.48 57.3514 17.48ZM79.3441 16.568L77.8561 17.48L76.0801 14.504L69.8401 17.48L66.8881 15.896C67.3041 14.792 67.7761 13.816 68.3041 12.968C68.8321 12.12 69.4321 11.328 70.1041 10.592C70.7761 9.84 71.5361 9.088 72.3841 8.336L71.1121 6.2C72.0561 4.648 73.2001 3.336 74.5441 2.264C75.9041 1.192 77.4881 0.503999 79.2961 0.199999C79.6641 0.359999 80.0321 0.559999 80.4001 0.8C80.7681 1.04 81.1201 1.304 81.4561 1.592C81.7921 1.864 82.0801 2.152 82.3201 2.456L78.5281 9.008L76.7521 8.096L79.7521 2.192C78.4401 2.592 77.2961 3.2 76.3201 4.016C75.3441 4.832 74.5041 5.784 73.8001 6.872L76.7281 12.008L80.0401 10.448L80.7121 12.296L77.7361 13.736L79.3441 16.568ZM69.8161 15.248L75.0241 12.776L73.6081 10.352C73.0481 10.88 72.5441 11.392 72.0961 11.888C71.6641 12.384 71.2641 12.904 70.8961 13.448C70.5281 13.976 70.1681 14.576 69.8161 15.248ZM87.4439 17.48L84.8279 16.376L89.9159 3.512L89.4839 1.88C90.3639 1.512 91.2919 1.216 92.2679 0.991999C93.2439 0.767999 94.2199 0.591999 95.1959 0.464C96.1879 0.335999 97.1239 0.263999 98.0039 0.248L98.4119 2.216L92.6279 3.44L90.7079 8.6C91.4919 8.328 92.2679 8.12 93.0359 7.976C93.8199 7.816 94.6599 7.68 95.5559 7.568L95.8919 9.2L89.8679 10.928L87.4439 17.48ZM104.301 17.48L102.189 16.424L104.109 10.136C103.613 11.08 103.077 12.032 102.501 12.992C101.941 13.936 101.365 14.8 100.773 15.584C100.181 16.352 99.5885 16.984 98.9965 17.48L95.9245 15.968L99.1885 5.528L101.589 6.608C101.509 7.28 101.333 8.04 101.061 8.888C100.805 9.72 100.469 10.608 100.053 11.552C99.6525 12.48 99.1965 13.416 98.6845 14.36L99.9565 14.984L105.525 5.6L107.757 6.272L104.301 17.48ZM115.059 17.48L112.467 16.592C112.563 15.888 112.747 15.088 113.019 14.192C113.291 13.296 113.619 12.384 114.003 11.456C114.403 10.512 114.811 9.648 115.227 8.864L112.827 8.816L108.843 17.48L106.875 16.592L110.955 8.768L109.971 7.304L111.507 4.544L113.283 4.952L113.043 7.856C113.571 7.328 114.099 6.864 114.627 6.464C115.171 6.048 115.691 5.728 116.187 5.504L118.179 7.52C117.475 9.2 116.867 10.864 116.355 12.512C115.843 14.144 115.411 15.8 115.059 17.48Z"
              fill="#0F140F"
            />
          </svg>
        </div>
        {/* Links */}
        <div className="hidden md:flex justify-center items-center gap-[30px]">
          <Link
            className="sm hover:scale-[1.04] transition-all !text-black-70 hover:!text-black"
            scroll={true}
            href={src1}
          >
            {link1}
          </Link>
          <Link
            className="sm hover:scale-[1.04] transition-all !text-black-70 hover:!text-black"
            scroll={true}
            href={src2}
          >
            {link2}
          </Link>
          <Link
            className="sm hover:scale-[1.04] transition-all !text-black-70 hover:!text-black"
            scroll={true}
            href={src3}
          >
            {link3}
          </Link>
          <Link
            className="sm hover:scale-[1.04] transition-all !text-black-70 hover:!text-black"
            scroll={true}
            href={src4}
          >
            {link4}
          </Link>
        </div>
        {/* CTA */}
        <Link className="hidden md:block" scroll={true} href={"/Plan"}>
          <button>Book Your Tour</button>
        </Link>
        {/* Hamburger Menu (visible on mobile) */}
        <div
          ref={menuButtonRef}
          onClick={handleNav}
          className="block md:hidden z-50 cursor-pointer"
          style={{ transformOrigin: "center" }}
        >
          {nav ? <X /> : <Menu />}
        </div>
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="sm:hidden fixed top-[0] right-[0] flex flex-col items-center py-[60] px-[30] w-[60%] max-xs:w-[80%] h-fit bg-white text-center z-40 rounded-[8] !rounded-r-[0] border border-black-40"
        >
          <ul className="flex flex-col gap-8">
            <li ref={addToMenuItemsRef} onClick={handleNav}>
              <h6>
                <Link scroll={true} href={src1}>
                  {link1}
                </Link>
              </h6>
            </li>
            <li ref={addToMenuItemsRef} onClick={handleNav}>
              <h6>
                <Link scroll={true} href={src2}>
                  {link2}
                </Link>
              </h6>
            </li>
            <li ref={addToMenuItemsRef} onClick={handleNav}>
              <h6>
                <Link scroll={true} href={src3}>
                  {link3}
                </Link>
              </h6>
            </li>
            <li ref={addToMenuItemsRef} onClick={handleNav}>
              <h6>
                <Link scroll={true} href={src4}>
                  {link4}
                </Link>
              </h6>
            </li>
            <li ref={addToMenuItemsRef} onClick={handleNav}>
              <Link scroll={true} href={"/Plan"}>
                <button>Book Your Tour</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
