import Discover from "@/components/Discover";
import Land_Hero from "@/components/Land_Hero";
import Navbar from "@/components/Navbar";
import Safety from "@/components/Safety";
import Pricing from "@/components/Pricing";
import React from "react";
import Home_CTA from "@/components/Home_CTA";
import Footer from "@/components/Footer";
import Facts from "@/components/Facts";

const page = () => {
  return (
    <main className="bg-white text-primary">
      <Navbar
        link1="Home"
        src1={"/"}
        link2="Pricing"
        src2={"#pricing"}
        link3="Facts"
        src3={"#facts"}
        link4="What You’ll Discover"
        src4={"#discover"}
      />
      <Land_Hero
        title={"Land Zone"}
        src={"/home_share.webp"}
        p={
          "From calm deer to aggressive lions. Welcome to the Land Zone, where every step brings you closer to nature."
        }
      />
      <Discover
        images={[
          { src: "/home_land_2.webp" },
          { src: "/land_2.jpg" },
          { src: "/land_3.jpg" },
          { src: "/land_4.jpg" },
          { src: "/land_5.jpg" },
          { src: "/land_6.jpg" },
          { src: "/land_7.jpg" },
          { src: "/land_8.webp" },
        ]}
      />
      <Safety
        points={[
          { pt: "Clean walkways and shade for families" },
          { pt: "All dangerous animals are kept safely behind enclosures" },
          { pt: "Only gentle animals roam freely" },
          { pt: "Feeding zones are supervised" },
        ]}
      />
      <Facts />
      <Pricing />
      <Home_CTA />
      <Footer />
    </main>
  );
};

export default page;
