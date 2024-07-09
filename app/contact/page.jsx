"use client";
import { useEffect, useRef, useState } from "react";

import ContactForm from "@/components/contact/form";
import HomeFooter from "@/components/home/footer";
import HomeNavbar from "@/components/home/navbar";

import Lenis from "lenis";
import { useMainContext } from "@/context/main-context";
import MobileNav from "@/components/home/mobile-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cards from "./cards";

function ContactPage() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
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

      <h1 className="text-center w-full inline-block mt-24 mb-5 md:mt-24 tracking-[1.12] leading-[-.005em] text-clamp font-bold">
        <span className="text-muted-foreground">Contact us.</span>
        <br />
        Your two cents.
      </h1>

      <Tabs defaultValue="email" className="w-full max-w-xl mx-auto">
        <div className="flex justify-center w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="email">Email orqali</TabsTrigger>
            <TabsTrigger value="call">Qo&apos;ng&apos;iroq qilish</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="email" className="bg-transparent h-fit">
          <ContactForm />
        </TabsContent>
        <TabsContent value="call" className="bg-transparent h-fit">
          <Cards />
        </TabsContent>
      </Tabs>
      <MobileNav
        openMobileNav={openMobileNav}
        setOpenMobileNav={setOpenMobileNav}
      />
      <HomeFooter />
    </div>
  );
}

export default ContactPage;
