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
    <section className="py-10 md:py-16 my-10 md:my-16 items-center bg-primary text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
        <div className="mb-4 md:mb-0 h-full">
          <h2 className="text-clamp-title md:!text-5xl">
            <span className="text-muted-foreground">Bepul.</span>
            <br />
            o&apos;rnatib beramiz. <br /> Sozlaymiz. O&apos;rgatamiz.
          </h2>
        </div>
        <div className="md:px-12 lg:px-16 space-y-4">
          <p class="mb-8 text-xl md:text-2xl text-foreground-secondary">
            Bizning menejerlarimiz sizga tovarlarni kiritish, uskunalarni ulash,
            xodimlarni o&apos;rgatishda yordam beradi, shuningdek, 7 kunlik
            bepul foydalanish muddatini taqdim etadi!
          </p>
          <Button variant="outline" className="flex items-center gap-1.5 text-primary">
            <span>Xizmatlarga o&apos;tish</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
