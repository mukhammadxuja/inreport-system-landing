"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

function Header() {
  const textRef = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    const words = textRef.current.children;

    gsap.fromTo(
      words,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      image.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.5,
        ease: "power3.out",
      },
      "<+=2.5"
    );
  }, []);

  return (
    <header className="container m-auto">
      <h1
        ref={textRef}
        className="inline-block mt-24 mb-10 md:mt-24 lg:mb-28 lg:mt-36 tracking-[1.12] leading-[-.005em] text-clamp font-bold"
      >
        <span style={{ display: "inline-block" }}>Tovarlar.</span>
        <span style={{ display: "inline-block" }}>Kassa.</span> <br />
        <span style={{ display: "inline-block" }}>Mijozlar.</span>
        <span style={{ display: "inline-block" }}>Moliya.</span>
        <br />
        <span
          style={{ display: "inline-block" }}
          className="text-muted-foreground"
        >
          Boshqaruvi.
        </span>
      </h1>

      <section id="about">
        <Image
          ref={image}
          width={200}
          height={200}
          className="h-[40vh] md:h-[60vh] lg:h-screen w-full rounded-lg object-cover bg-left"
          src="/landing.webp"
          alt="Showcase ai"
        />
      </section>
    </header>
  );
}

export default Header;
