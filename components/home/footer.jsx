"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Mail, Phone } from "lucide-react";

function HomeFooter() {
  const textRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref);

  // useEffect(() => {
  //   if (isInView) {
  //     const words = textRef.current.children;

  //     gsap.fromTo(
  //       words,
  //       { y: 50, opacity: 0 },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         stagger: 0.3,
  //         duration: 1,
  //         ease: "power3.out",
  //       }
  //     );
  //   }
  // }, [isInView]);

  return (
    <footer
      ref={ref}
      className="relative h-[70vh] md:h-[60vh] lg:h-[65vh] bg-primary -mt-2"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="h-full">
        <div className="w-full fixed bottom-0 left-0">
          <div className="container mx-auto flex flex-col">
            <div className="flex flex-col md:flex-row py-10">
              <div className="space-y-2.5 mb-10 md:mb-0">
                {/* <Image
                  width={20}
                  height={20}
                  className="w-10"
                  src="/white-logo.svg"
                  alt="Footer logo"
                /> */}
                <div className="flex gap-3">
                  <Mail className="w-10 text-white" />
                  <a href="mailto:" className="text-lg font-bold text-white">
                    dotsoftuz@gmail.com
                  </a>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-10 text-white" />
                  <span className="flex flex-col">
                    <a
                      href="tel:+998995575230"
                      className="text-lg font-bold text-white"
                    >
                      99 557-52-30
                    </a>
                    <a
                      href="tel:+998919449491"
                      className="text-lg font-bold text-white"
                    >
                      91 944-94-91
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex flex-row">
                <ul className="flex flex-col -space-y-2.5 pr-20 md:pl-20">
                  <li className="nav-link uppercase text-secondary opacity-75 text-xs -mt-2.5 cursor-text">
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
                  <li className="nav-link uppercase text-secondary opacity-75 text-xs -mt-2.5 cursor-text">
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
              Inreport — Sotuvni avtomatlashtiruvchi dastur.
            </small>
            <small className="!opacity-60 text-sm">2024</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
