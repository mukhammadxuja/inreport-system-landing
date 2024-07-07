"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Shapes from "./floating-shape/shapes";
import Plus from "./floating-shape/plus";

function HomeServices() {
  return (
    <section className="h-screen mt-10 md:mt-16 lg:border-y-2 border-border items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
        <div className="h-full">{/* <Plus /> */}</div>
        <div className="lg:border-l-2 border-border p-4 md:p-12 lg:px-16 space-y-4 md:space-y-6">
          <h2 className="text-5xl items-center">
            <span className="text-muted-foreground">Our services.</span>
            <br />
            Design-led digital products.
          </h2>
          <p className="mb-8 text-lg md:text-2xl text-foreground-secondary font-semibold leading-[1.5rem] md:leading-[2rem]">
            There is no room for shortcuts when building a great digital
            experience. Everything starts with thorough research and iterative
            experimentation. No stone is left unturned to make data-minded
            decisions. Then we build from scratch, designing and developing,
            tailored to what users need.
          </p>
          <Button variant="outline" className="flex items-center gap-1.5">
            <span>Go to services</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
