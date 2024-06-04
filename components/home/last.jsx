"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import "regenerator-runtime/runtime";
import * as Phys from "react-dom-box2d";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function LastSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  return (
    <div id="contact" className="relative">
      <div className="absolute z-20 flex flex-col justify-center top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2 space-y-2">
        <h2 className="text-clamp-title text-center">
          How can we
          <span className="text-muted-foreground"> help?</span>
        </h2>
        <div className="flex md:hidden items-center gap-2 mx-auto">
          <Input className="w-full md:w-72" placeholder="Send something" />
          <Button>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Phys.World
        ref={ref}
        width={window.innerWidth}
        height={500}
        gravity={[0, 9.8]}
        className="w-screen"
      >
        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={10}
          restitution={0.85}
        >
          <div className="relative text-white py-2 px-4 border border-[#6254e8] w-fit">
            <h4 className="text-2xl font-bold whitespace-nowrap text-[#6254e8]">
              Talent{" "}
            </h4>
            <div className="w-2 h-2 bg-[#6254e8] absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-[#6254e8] absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-[#6254e8] absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-[#6254e8] absolute -bottom-1 -right-1" />
          </div>
        </Phys.Item>
        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={3}
          restitution={0.85}
        >
          <div className="bg-gray-200 bottom border-border p-2 rounded-xl shadow-md w-fit">
            <Image
              className="rounded-xl"
              width={80}
              height={80}
              src="/assets/avatars/7.png"
              alt="Avatars"
            />
          </div>
        </Phys.Item>
        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={8}
          restitution={0.85}
        >
          <div className="relative text-white py-2 px-4 border border-[#3eab99] w-fit">
            <h4 className="text-2xl font-bold whitespace-nowrap text-[#3eab99]">
              Showcase{" "}
            </h4>
            <div className="w-2 h-2 bg-[#3eab99] absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-[#3eab99] absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-[#3eab99] absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-[#3eab99] absolute -bottom-1 -right-1" />
          </div>
        </Phys.Item>

        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={3}
          restitution={0.85}
        >
          <div className="bg-red-500 bottom border-border p-2 rounded-2xl shadow-md w-fit">
            <Image
              className="rounded-xl"
              width={80}
              height={80}
              src="/assets/avatars/5.png"
              alt="Avatars"
            />
          </div>
        </Phys.Item>
        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={3}
          restitution={0.85}
        >
          <div className="bg-violet-500 bottom border-border p-2 rounded-3xl shadow-md w-fit">
            <Image
              className="rounded-xl"
              width={80}
              height={80}
              src="/assets/avatars/9.png"
              alt="Avatars"
            />
          </div>
        </Phys.Item>

        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={7}
          restitution={0.85}
        >
          <div className="relative text-white py-2 px-4 border border-[#f36528] w-fit">
            <h4 className="text-2xl font-bold whitespace-nowrap text-[#f36528]">
              Your
            </h4>
            <div className="w-2 h-2 bg-[#f36528] absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-[#f36528] absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-[#f36528] absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-[#f36528] absolute -bottom-1 -right-1" />
          </div>
        </Phys.Item>

        <Phys.Item left={window.innerWidth / 3} top={100} restitution={0.6}>
          <div className="!flex items-center gap-2 w-fit mb-4 rounded-md bg-gray-100 p-2">
            <Input className="w-full md:w-72" placeholder="Send something" />
            <Button>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Phys.Item>

        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={12}
          restitution={0.85}
        >
          <div className="relative text-white py-2 px-4 border border-[#0269fa] w-fit">
            <h4 className="text-2xl font-bold whitespace-nowrap text-[#0269fa]">
              Achieve
            </h4>
            <div className="w-2 h-2 bg-[#0269fa] absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-[#0269fa] absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-[#0269fa] absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-[#0269fa] absolute -bottom-1 -right-1" />
          </div>
        </Phys.Item>

        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={3}
          restitution={0.85}
        >
          <div className="bg-purple-500 bottom border-border p-2 rounded-full shadow-md w-fit">
            <Image
              className="rounded-full"
              width={80}
              height={80}
              src="/assets/avatars/4.png"
              alt="Avatars"
            />
          </div>
        </Phys.Item>

        <Phys.Item
          shape="box"
          left={window.innerWidth / 3}
          top={10}
          restitution={0.85}
        >
          <div className="relative text-white py-2 px-4 border border-[#e0341a] w-fit">
            <h4 className="text-2xl font-bold whitespace-nowrap text-[#e0341a]">
              Greatness
            </h4>
            <div className="w-2 h-2 bg-[#e0341a] absolute -top-1 -left-1" />
            <div className="w-2 h-2 bg-[#e0341a] absolute -top-1 -right-1" />
            <div className="w-2 h-2 bg-[#e0341a] absolute -bottom-1 -left-1" />
            <div className="w-2 h-2 bg-[#e0341a] absolute -bottom-1 -right-1" />
          </div>
        </Phys.Item>
      </Phys.World>
    </div>
  );
}

export default LastSection;
