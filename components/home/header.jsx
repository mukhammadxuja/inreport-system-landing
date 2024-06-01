"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Header() {
  const textRef = useRef(null);

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
  }, []);
  
  return (
    <header className="container m-auto">
      <h1
        ref={textRef}
        className="inline-block mb-14 md:mb-20 mt-20 md:mt-32 lg:mt-40 tracking-[1.12] leading-[-.005em] text-clamp font-bold"
      >
        <span style={{ display: "inline-block" }}>Showcase.</span>
        <span style={{ display: "inline-block" }}>Your.</span> <br />
        <span style={{ display: "inline-block" }}>Talent.</span>
        <span style={{ display: "inline-block" }}>Achieve.</span>
        <br />
        <span
          style={{ display: "inline-block" }}
          className="text-muted-foreground"
        >
          Greatness.
        </span>
      </h1>
    </header>
  );
}

export default Header;
