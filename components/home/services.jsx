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
    <section className="h-full lg:h-screen mt-10 md:mt-16 items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
        <div className="hidden lg:block h-full">{/* <Plus /> */}</div>
        <div className="p-4 md:p-12 lg:px-16 space-y-4 md:space-y-6">
          <h2 className="text-clamp-title md:!text-5xl items-center">
            <span className="text-muted-foreground">Xizmatlarimiz.</span>
            <br />
            O&apos;rnatish. Sozlash. O&apos;rgatish.
          </h2>
          <p class="mb-8 text-xl md:text-2xl text-foreground-secondary">
            Bizning menejerlarimiz sizga tovarlarni kiritish, uskunalarni ulash,
            xodimlarni o&apos;rgatishda yordam beradi, shuningdek, 7 kunlik
            bepul foydalanish muddatini taqdim etadi!
          </p>
          <Button variant="outline" className="flex items-center gap-1.5">
            <span>Xizmatlarga o&apos;tish</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
