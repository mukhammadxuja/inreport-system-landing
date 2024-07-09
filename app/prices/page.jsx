"use client";
import { useEffect, useRef, useState } from "react";

import HomeFooter from "@/components/home/footer";
import HomeNavbar from "@/components/home/navbar";

import Lenis from "lenis";
import { useMainContext } from "@/context/main-context";
import MobileNav from "@/components/home/mobile-nav";
import Price from "@/components/prices";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import Compare from "@/components/prices/compare";

function ContactPage() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      // wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <HomeNavbar setOpenMobileNav={setOpenMobileNav} />
      <div
        onClick={() => setOpenMobileNav(false)}
        className={`${
          openMobileNav ? "opacity-100 z-[100]" : "opacity-0 -z-10"
        } h-screen w-full fixed top-0 left-0 bg-black bg-opacity-50 border-b-2 backdrop-blur-sm duration-200`}
      />
      <MobileNav
        openMobileNav={openMobileNav}
        setOpenMobileNav={setOpenMobileNav}
      />
      <Price />
      {/* <Compare /> */}
      <FAQ />
      <Contact />
      <HomeFooter />
    </div>
  );
}

export default ContactPage;
