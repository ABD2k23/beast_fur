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
        src2={"/pricing"}
        link3="Facts"
        src3={"#facts"}
        link4="What You’ll Discover"
        src4={"#discover"}
      />
      <Land_Hero
        title={"Water Zone"}
        src={"/water_5.jpg"}
        p={
          "Explore the magical Water Zone, where you can safely interact with gentle sea creatures for an unforgettable experience."
        }
      />
      <Discover
        images={[
          { src: "/water_1.jpg" },
          { src: "/water_2.webp" },
          { src: "/water_3.webp" },
          { src: "/water_4.jpg" },
          { src: "/water_5.jpg" },
          { src: "/water_6.jpg" },
          { src: "/water_7.jpg" },
          { src: "/water_8.jpg" },
        ]}
      />

      <Safety
        points={[
          { pt: "Shallow zones are protected by barriers for child safety" },
          { pt: "Clean Viewing areas at every turn" },
          { pt: "Lifeguards and trainers are always around" },
          { pt: "Handwashing stations at every turn" },
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
