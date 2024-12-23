"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Shapes from "./floating-shape/shapes";
import Plus from "./floating-shape/plus";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeServices({ t }) {
  const freeSupportText = (
    <>
      <li className="text-4xl font-bold whitespace-nowrap">
        <span className="text-muted-foreground">{t("Bepul")}</span>{" "}
        {t("yordam va qo'llab-quvvatlash")}
      </li>
      <li className="text-4xl font-bold whitespace-nowrap">•</li>
    </>
  );
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the first segment or the only one if there's just one
  const firstPathSegment =
    pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";

  return (
    <section className="mb-10 md:mb-16">
      <section className="py-10 md:py-16 my-10 md:mt-16 md:mb-10 items-center bg-primary text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full">
          <div className="mb-4 md:mb-0 h-full">
            <h2 className="text-clamp-title md:!text-5xl">
              <span className="text-muted-foreground">{t("Bepul")}.</span>
              <br />
              {t("O'rnatib beramiz")}. <br /> {t("Sozlaymiz")}.{" "}
              {t("O'rgatamiz")}.
            </h2>
          </div>
          <div className="md:px-12 lg:px-16 space-y-4">
            <p class="mb-8 text-xl md:text-2xl text-foreground-secondary">
              {t("Our managers will teach")}
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-1.5 text-primary"
            >
              <span>{t("Xizmatlarga o'tish")}</span>
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
            {Array.from({ length: 8 }).map((_, index) => (
              <React.Fragment key={index}>{freeSupportText}</React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="bg-accent shadow-sm p-6 rounded-lg h-[27rem] flex flex-col justify-between">
          <div className="space-y-2 md:space-y-5">
            <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
              {t("Hisob-kitoblaringizni qo'lda yuritasizmi?")}
              <span className="text-muted-foreground"></span>
            </h5>
            <p className="text-base text-secondary-foreground">
              {t("Hisob-kitoblaringizni qo'lda yuritasizmi more")}
            </p>
          </div>
          <Link href={`${firstPathSegment}/ledger`}>
            <Button className="flex items-center gap-2.5 w-full">
              <span>{t("Ko'proq ma'lumot olish")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="bg-accent shadow-sm p-6 rounded-lg h-[27rem] flex flex-col justify-between">
          <div className="space-y-2 md:space-y-5">
            <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
              {t("Boshqa dasturdan foydalanasizmi?")}
              <span className="text-muted-foreground"></span>
            </h5>
            <p className="text-base text-secondary-foreground">
              {t("Boshqa dasturdan foydalanasizmi more")}
            </p>
          </div>
          <Link href={`${firstPathSegment}/contact`}>
            <Button className="flex items-center gap-2.5 w-full">
            <span>{t("Ko'proq ma'lumot olish")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
