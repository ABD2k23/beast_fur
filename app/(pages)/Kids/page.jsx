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
        title={"Kids Playground"}
        src={"/home_kids_1.jpg"}
        p={
          "A colorful zone where imagination runs wild, little ones make big discoveries, and nature-inspired play brings endless joy."
        }
      />
      <Discover
        images={[
          { src: "/home_kids_2.jpg" },
          { src: "/kids_2.jpg" },
          { src: "/kids_3.jpg" },
          { src: "/kids_4.jpg" },
          { src: "/kids_5.jpg" },
          { src: "/kids_6.webp" },
          { src: "/kids_7.jpg" },
          { src: "/kids_8.jpg" },
        ]}
      />
      <Safety
        points={[
          { pt: "Soft play surfaces reduce injury risks" },
          { pt: "Shaded benches let parents rest nearby" },
          { pt: "Friendly staff supervise every activity" },
          { pt: "Secure gates keep kids safely inside" },
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
