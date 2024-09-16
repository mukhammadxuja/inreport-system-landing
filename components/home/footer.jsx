"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeFooter({t}) {
  const textRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the first segment or the only one if there's just one
  const firstPathSegment =
    pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";

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
      className="relative h-[70vh] sm:h-[50vh] bg-primary -mt-2"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div>
        <div className="w-full fixed bottom-0 left-0">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center mb-10">
            <div>
              <Image
                width={140}
                height={140}
                src="/inreport logo light.svg"
                alt="Logo"
                // className="w-7 h-7 lg:h-5 lg:w-5 transition-all group-hover:scale-110 opacity-90"
              />
              <h1
                ref={textRef}
                className="inline-block mb-14 md:mb-20 mt-5 text-white tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold"
              >
                <span style={{ display: "inline-block" }}>{t("Tovarlar")}.</span>
                <span style={{ display: "inline-block" }}>{t("Kassa")}.</span> <br />
                <span style={{ display: "inline-block" }}>{t("Mijozlar")}.</span>
                <span style={{ display: "inline-block" }}>{t("Moliya")}.</span>
                <br />
                <span
                  style={{ display: "inline-block" }}
                  className="text-gray-400"
                >
                  {t("Boshqaruvi")}.
                </span>
              </h1>
            </div>
            <div className="flex">
              <ul className="flex flex-col -space-y-2.5 pr-20">
                <li className="nav-link uppercase text-secondary opacity-75 text-xs">
                  <span>Inreport</span>
                </li>
                <li className="nav-link text-white">
                  <Link href={`${firstPathSegment}/prices`}>{t("Narxlar")}</Link>
                </li>
                <li className="nav-link text-white">
                  <Link href="/#services">{t("Xizmatlar")}</Link>
                </li>
                <li className="nav-link text-white">
                  <Link href={`${firstPathSegment}/aboutus`}>{t("Haqimizda")}</Link>
                </li>
                <li className="nav-link text-white">
                  <Link href={`${firstPathSegment}/privacy`}>
                    {t("Maxfiylik siyosati")}
                  </Link>
                </li>
                <li className="nav-link text-white">
                  <Link href={`${firstPathSegment}/agreement`}>
                    {t("Foydalanish shartlari")}
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col -space-y-2.5">
                <li className="nav-link uppercase text-secondary opacity-75 text-xs">
                  <span>{t("Ijtimoy tarmoqlarda")}</span>
                </li>
                <li className="nav-link text-white">
                  <a
                    href="https://www.instagram.com/inreport.uz/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                {/* <li className="nav-link text-white">LInkedin</li> */}
                <li className="nav-link text-white">
                  <a href="https://t.me/inreport" target="_blank">
                    Telegram
                  </a>
                </li>
                {/* <li className="nav-link text-white">
                  <a href="#contact">Twitter</a>
                </li> */}
                <li className="nav-link text-white">
                  <a href="https://github.com/dotsoftuz" target="_blank">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto pb-4 flex items-center justify-between text-white">
            <small className="!opacity-60 text-sm">
              INREPORT — {t("Savdo boshqaruvi")}
            </small>
            <a
              href="https://dotsoft.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="!opacity-60 text-sm"
            >
              Dotsoft MCHJ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
