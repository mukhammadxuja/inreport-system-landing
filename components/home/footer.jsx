"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "framer-motion";

function HomeFooter() {
  const textRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const words = textRef.current.children;

      gsap.fromTo(
        words,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [isInView]);

  return (
    <footer
      ref={ref}
      className="relative h-[50vh] md:h-[60vh] lg:h-[65vh] bg-[#171717] -mt-2"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="container mx-auto">
        <div className="fixed bottom-0 w-full">
          <div className="flex flex-col">
            <Image
              width={20}
              height={20}
              className="w-10 mt-10"
              src="/white-logo.svg"
              alt="Footer logo"
            />
            <h1
              ref={textRef}
              className="inline-block mb-14 md:mb-20 mt-20 md:mt-32 text-white lg:mt-40 tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold"
            >
              <span style={{ display: "inline-block" }}>Showcase.</span>
              <span style={{ display: "inline-block" }}>Your.</span> <br />
              <span style={{ display: "inline-block" }}>Talent.</span>
              <span style={{ display: "inline-block" }}>Achieve.</span>
              <br />
              <span
                style={{ display: "inline-block" }}
                className="text-gray-400"
              >
                Greatness.
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-between text-white">
            <small className="!opacity-60 text-sm">
              Showcase — Design-led digital products
            </small>
            <small className="!opacity-60 text-sm">Legal</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
