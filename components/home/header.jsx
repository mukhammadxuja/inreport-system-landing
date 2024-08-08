/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Button } from "../ui/button";

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
        stagger: 0.05,
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
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      },
      "<+=0.5"
    );
  }, []);

  return (
    <header className="container m-auto">
      <h1
        ref={textRef}
        className="mt-24 mb-10 md:mt-24 lg:mb-24 lg:mt-36 tracking-[1.12] leading-[-.005em] text-clamp font-bold"
      >
        <span
          style={{ display: "inline-block" }}
          className="text-4xl md:text-5xl lg:text-6xl"
        >
          Sotuvlaringizni&nbsp;
          <span className="text-muted-foreground">Inreport</span>
        </span>
        <br />
        <span
          style={{ display: "inline-block" }}
          className="text-4xl md:text-5xl lg:text-6xl"
        >
          bilan boshqaring
        </span>
        <br />
        <span
          style={{ display: "inline-block" }}
          className="text-muted-foreground text-xl md:text-2xl lg:text-2xl font-normal"
        >
          Savdo jarayonlaringizni soddalashtiring va <br /> daromadingizni
          oshiring
        </span>
        <span className="flex gap-2 mt-7">
          <Button>Bepul boshlang</Button>
          <Button variant="outline">Demoni ko&apos;rish</Button>
        </span>
      </h1>

      <section ref={image} id="about">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 pb-[48px]">
          <a href="#" className="flex gap-4 rounded-xl p-2 hover:bg-accent">
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                Sotuvlar Hisobotlari
              </p>
              <p className="text-sm text-foreground-secondary">
                Sotuvlaringizni real vaqt tahlillari bilan kuzating.
              </p>
            </div>
          </a>
          <a href="#" className="flex gap-4 rounded-xl p-2 hover:bg-accent">
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                Xodimlar Boshqaruvi
              </p>
              <p className="text-sm text-foreground-secondary">
                Jamoangizning ish faoliyatini samarali boshqaring.
              </p>
            </div>
          </a>
          <a href="#" className="flex gap-4 rounded-xl p-2 hover:bg-accent">
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                Avtomatlashtirish
              </p>
              <p className="text-sm text-foreground-secondary">
                Savdo jarayonlarini avtomatlashtiring va vaqtni tejang.
              </p>
            </div>
          </a>
          <a href="#" className="flex gap-4 rounded-xl p-2 hover:bg-accent">
            <img
              className="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
              src="https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/"
              alt=""
              width="1600"
              height="1200"
            />
            <div className="flex flex-col flex-1 space-y-1">
              <p className="line-clamp-2 max-w-sm text-lg/tight font-medium">
                Qo&apos;lllab-Quvvatlash
              </p>
              <p className="text-sm text-foreground-secondary">
                Doimiy yordam va qo&apos;lllab-quvvatlash xizmatlaridan
                foydalaning.
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
