/* eslint-disable @next/next/no-img-element */
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
        stagger: 0.2,
        duration: 0.2,
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
        duration: 0.3,
        ease: "power3.out",
      },
      "<+=1.8"
    );
  }, []);

  return (
    <header className="container m-auto">
      <h1
        ref={textRef}
        className="inline-block mt-24 mb-10 md:mt-24 lg:mb-24 lg:mt-36 tracking-[1.12] leading-[-.005em] text-clamp font-bold"
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

      <section ref={image} id="about">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 pb-[48px]">
          <a
            href="#"
            className="flex gap-4 rounded-xl p-2 hover:bg-accent"
          >
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                mishmash. Unique e-commerce design for the ultimate product
                experience.
              </p>
              <p className="text-sm text-foreground-secondary">
                From our projects
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex gap-4 rounded-xl p-2 hover:bg-accent"
          >
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                mishmash. Unique e-commerce design for the ultimate product
                experience.
              </p>
              <p className="text-sm text-foreground-secondary">
                From our projects
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex gap-4 rounded-xl p-2 hover:bg-accent"
          >
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                mishmash. Unique e-commerce design for the ultimate product
                experience.
              </p>
              <p className="text-sm text-foreground-secondary">
                From our projects
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex gap-4 rounded-xl p-2 hover:bg-accent"
          >
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                mishmash. Unique e-commerce design for the ultimate product
                experience.
              </p>
              <p className="text-sm text-foreground-secondary">
                From our projects
              </p>
            </div>
          </a>
        </div>

        <Image
          width={200}
          height={200}
          className="h-[60vh] lg:h-screen w-full rounded-lg object-cover bg-left"
          src="/landing.webp"
          alt="Showcase ai"
        />
      </section>
    </header>
  );
}

export default Header;
