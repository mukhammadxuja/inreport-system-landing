"use client";
import { useEffect, useRef, useState } from "react";

import ContactForm from "@/components/contact/form";
import HomeFooter from "@/components/home/footer";
import HomeNavbar from "@/components/home/navbar";

import Lenis from "lenis";

function ContactPage() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <HomeNavbar />
      <ContactForm />
      <HomeFooter />
    </div>
  );
}

export default ContactPage;
