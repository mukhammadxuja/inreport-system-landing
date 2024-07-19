/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Send, Shirt, Store } from "lucide-react";

const projects = [
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Elsa Jonson",
    avatar: "./assets/avatars/3.png",
    src: "./assets/templates/default/desktop.png",
    color: "#615EFC",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Office Studio",
    avatar: "./assets/avatars/2.png",
    src: "./assets/templates/bento/desktop.png",
    color: "#8C8C8C",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Locomotive",
    avatar: "./assets/avatars/7.png",
    src: "./assets/templates/minimalistic/desktop.png",
    color: "#EFE8D3",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Silencio",
    avatar: "./assets/avatars/9.png",
    src: "./assets/templates/default/desktop.png",
    color: "#706D63",
  },
];

function Types() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [hoveredButton, setHoveredButton] = useState("kiyim");

  const images = {
    kiyim:
      "https://billz.io/_next/image?url=https%3A%2F%2Fbillzwp.billz.work%2Fwp-content%2Fuploads%2F2022%2F06%2F10.webp&w=1920&q=75",
    konselareya:
      "https://billz.io/_next/image?url=https%3A%2F%2Fbillzwp.billz.work%2Fwp-content%2Fuploads%2F2022%2F06%2F12.webp&w=1920&q=75",
    shoes:
      "https://billz.io/_next/image?url=https%3A%2F%2Fbillzwp.billz.work%2Fwp-content%2Fuploads%2F2022%2F06%2F12.webp&w=1920&q=75",
  };

  return (
    <section id="Types" className="container mx-auto my-10 md:my-16">
      <div className="w-full mb-5">
        <h2 className="text-clamp-title items-center">
          <span className="text-muted-foreground">Har qanday</span>
          <br />
          do&apos;konga mos keladi.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 md:gap-8 lg:gap-12">
        <div className="lg:col-span-2 py-5 space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("kiyim")}
              onMouseLeave={() => setHoveredButton("kiyim")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Shirt className="w-4 h-4" />
              <span>Kiyim do&apos;koni</span>
            </Button>
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("konselareya")}
              onMouseLeave={() => setHoveredButton("konselareya")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Store className="w-4 h-4" />
              <span>Kanselyariya do&apos;koni</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("kiyim")}
              onMouseLeave={() => setHoveredButton("kiyim")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Shirt className="w-4 h-4" />
              <span>Kiyim do&apos;koni</span>
            </Button>
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("konselareya")}
              onMouseLeave={() => setHoveredButton("konselareya")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Store className="w-4 h-4" />
              <span>Kanselyariya do&apos;koni</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("kiyim")}
              onMouseLeave={() => setHoveredButton("kiyim")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Shirt className="w-4 h-4" />
              <span>Kiyim do&apos;koni</span>
            </Button>
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("konselareya")}
              onMouseLeave={() => setHoveredButton("konselareya")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Store className="w-4 h-4" />
              <span>Kanselyariya do&apos;koni</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("kiyim")}
              onMouseLeave={() => setHoveredButton("kiyim")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Shirt className="w-4 h-4" />
              <span>Kiyim do&apos;koni</span>
            </Button>
            <Button
              variant="secondary"
              onMouseEnter={() => setHoveredButton("konselareya")}
              onMouseLeave={() => setHoveredButton("konselareya")}
              className="flex items-center gap-4 w-full hover:bg-gray-200/80"
            >
              <Store className="w-4 h-4" />
              <span>Kanselyariya do&apos;koni</span>
            </Button>
          </div>
        </div>
        <div className="w-full h-full hidden lg:block">
          <img
            src={hoveredButton ? images[hoveredButton] : images.default}
            alt="Hovered"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Types;
