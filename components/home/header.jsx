/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Button } from "../ui/button";

function Header() {
  const textRef = useRef(null);
  const image = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    const words = textRef.current.children;

    gsap.fromTo(
      words,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 1,
        ease: "power3.out",
      }
    );
    
    gsap.fromTo(
      logo.current,
      { y: -100, x: 100, opacity: 0 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      },
      "<+=0.5"
    );

    gsap.fromTo(
      image.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      },
      "<+=0.5"
    );
  }, []);

  // const mainBannerEnter = "/inreport banner 1.jpg"

  return (
    <header className="container m-auto">
      <div className="flex items-center justify-between">
        <div ref={textRef} className="mt-24 mb-10 md:mt-24 lg:mb-24 lg:mt-36">
          <h1
            style={{ display: "inline-block" }}
            className="text-6xl md:text-8xl lg:text-8xl tracking-tight leading-[-.005em] font-bold"
          >
            INREPORT
          </h1>
          <br />
          <p
            style={{ display: "inline-block" }}
            className="text-gray-600 md:text-2xl lg:text-3xl font-normal mt-3 md:mt-5"
          >
            Savdo jarayonlarini soddalashtiring va <br /> biznesingizni yangi
            bosqichga olib chiqing!
          </p>
          <div className="flex gap-2 mt-7">
            <Button>Bepul boshlang</Button>
            <Button variant="outline">Demoni ko&apos;rish</Button>
          </div>
        </div>
        <div ref={logo}>
          <Image
            width={500}
            height={500}
            className="object-cover hidden sm:block"
            src="/reverseLogo.svg"
            alt="Showcase ai"
          />
        </div>
      </div>
      <section ref={image} id="about">
        <Image
          width={200}
          height={200}
          className="w-full rounded-lg object-cover bg-left hidden sm:block"
          src="/inreport banner 2.jpg"
          alt="Showcase ai"
        />
        <Image
          width={200}
          height={200}
          className="w-full rounded-lg object-cover bg-left block sm:hidden"
          src="/inreport banner mobile.jpg"
          alt="Showcase ai"
        />

        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 pt-[48px]">
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
        </div> */}
      </section>
    </header>
  );
}

export default Header;
