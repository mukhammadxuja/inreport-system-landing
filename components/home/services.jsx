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
    <section className="mb-10 md:mb-16">
      <section className="py-10 md:py-16 my-10 md:mt-16 md:mb-10 items-center bg-primary text-white">
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
              Bizning menejerlarimiz sizga tovarlarni kiritish, uskunalarni
              ulash, xodimlarni o&apos;rgatishda yordam beradi, shuningdek, 7
              kunlik bepul foydalanish muddatini taqdim etadi!
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-1.5 text-primary"
            >
              <span>Xizmatlarga o&apos;tish</span>
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden rounded-lg my-10">
        <div class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul
            class="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
            <li className="text-4xl font-bold whitespace-nowrap">•</li>
            <li className="text-4xl font-bold whitespace-nowrap">
              <span className="text-muted-foreground">Bepul</span> yordam va
              qo&apos;llab-quvvatlash
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="bg-accent shadow-sm p-6 rounded-lg h-[27rem] flex flex-col justify-between">
          <div className="space-y-2 md:space-y-5">
            <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
              Hisob-kitoblaringizni{" "}
              <span className="text-muted-foreground">
                qog`ozda yuritasizmi?
              </span>
            </h5>
            <p className="text-base text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, aut! Doloribus eligendi, a quas sunt praesentium
              necessitatibus tempore eos quaerat, libero quibusdam accusantium
              numquam illum cum at pariatur repellat error.
            </p>
          </div>
          <Button className="flex items-center gap-2.5 w-full">
            <span>Ko&apos;proq ma&apos;lumot olish</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="bg-accent shadow-sm p-6 rounded-lg h-[27rem] flex flex-col justify-between">
          <div className="space-y-2 md:space-y-5">
            <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
              Hisob-kitoblaringizni{" "}
              <span className="text-muted-foreground">
                qog`ozda yuritasizmi?
              </span>
            </h5>
            <p className="text-base text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, aut! Doloribus eligendi, a quas sunt praesentium
              necessitatibus tempore eos quaerat, libero quibusdam accusantium
              numquam illum cum at pariatur repellat error.
            </p>
          </div>
          <Button className="flex items-center gap-2.5 w-full">
            <span>Ko&apos;proq ma&apos;lumot olish</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
