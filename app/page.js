import Activities from "@/components/Activities";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Home_CTA from "@/components/Home_CTA";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Share from "@/components/Share";
import Zones from "@/components/Zones";

import React from "react";

const page = () => {
  return (
    <main className="bg-white text-black">
      <Navbar
        link1="Zones"
        src1={"#zones"}
        link2="Activities"
        src2={"#activities"}
        link3="Pricing"
        src3={"#pricing"}
        link4="Share Your Moments"
        src4={"#share"}
      />
      <Hero />
      <Zones />
      <Activities />
      <Pricing />
      <Share />
      <Home_CTA />
      <Footer />
    </main>
  );
};

export default page;
