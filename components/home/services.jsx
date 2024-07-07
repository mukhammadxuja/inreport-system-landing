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
    <section className="h-auto mt-10 md:mt-16 lg:border-y-2 border-border items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
        <div className="h-full">
          {/* <Plus /> */}
        </div>
        <div className="lg:border-l-2 border-border p-4 md:p-12 lg:px-16 space-y-4 md:space-y-6">
          <h2 className="text-clamp-title items-center">
            <span className="text-muted-foreground">Our services.</span>
          </h2>
          <p className="mb-8 text-lg md:text-2xl text-foreground-secondary font-semibold leading-[1.5rem] md:leading-[2rem]">
            Bizning menejerlarimiz sizga tovarlarni kiritish, uskunalarni ulash,
            xodimlarni o`rgatishda yordam beradi, shuningdek, 7 kunlik bepul
            foydalanish muddatini taqdim etadi!
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
