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
      <div>
        <div className="w-full fixed bottom-0 left-0">
          <div className="container mx-auto flex flex-col">
            <Image
              width={20}
              height={20}
              className="w-10 mt-10"
              src="/white-logo.svg"
              alt="Footer logo"
            />
            <div className="flex justify-between">
              <h1
                ref={textRef}
                className="inline-block mb-14 md:mb-20 mt-20 md:mt-32 text-white lg:mt-40 tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold"
              >
                <span style={{ display: "inline-block" }}>Streamline.</span>
                <span style={{ display: "inline-block" }}>Boost.</span> <br />
                <span style={{ display: "inline-block" }}>Automate.</span>
                <span style={{ display: "inline-block" }}>Maximize.</span>
                <br />
                <span
                  style={{ display: "inline-block" }}
                  className="text-gray-400"
                >
                  Effortless.
                </span>
              </h1>
              <div className="hidden lg:flex -mt-10">
                <ul className="flex flex-col -space-y-2.5 pr-20">
                  <li className="nav-link uppercase text-secondary opacity-75 text-xs">
                    <span>Inreport</span>
                  </li>
                  <li className="nav-link text-white">
                    <a href="#templates">Prices</a>
                  </li>
                  <li className="nav-link text-white">Services</li>
                  <li className="nav-link text-white">
                    <a href="#about">About</a>
                  </li>
                  <li className="nav-link text-white">
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
                <ul className="flex flex-col -space-y-2.5">
                  <li className="nav-link uppercase text-secondary opacity-75 text-xs">
                    <span>Follow Us</span>
                  </li>
                  <li className="nav-link text-white">
                    <a href="#templates">Instagram</a>
                  </li>
                  <li className="nav-link text-white">LInkedin</li>
                  <li className="nav-link text-white">
                    <a href="#about">Telegram</a>
                  </li>
                  <li className="nav-link text-white">
                    <a href="#contact">Twitter</a>
                  </li>
                  <li className="nav-link text-white">
                    <a href="#contact">Github</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container mx-auto pb-4 flex items-center justify-between text-white">
            <small className="!opacity-60 text-sm">
              Inreport — Sales automation software.
            </small>
            <small className="!opacity-60 text-sm">Legal</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
