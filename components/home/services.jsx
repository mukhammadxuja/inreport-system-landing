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
    <section className="h-screen mt-10 md:mt-16 items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
        <div className="hidden lg:block h-full">{/* <Plus /> */}</div>
        <div className="p-4 md:p-12 lg:px-16 space-y-4 md:space-y-6">
          <h2 className="text-clamp-title md:!text-5xl items-center">
            <span className="text-muted-foreground">Our services.</span>
            <br />
            Design-led digital products.
          </h2>
          <p class="mb-8 text-xl md:text-2xl text-foreground-secondary">
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
