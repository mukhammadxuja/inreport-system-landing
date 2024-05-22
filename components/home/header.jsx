"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import Card from "./cards/card";

function Header() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <main
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      class="h-screen w-screen overflow-hidden relative"
    >
      <div class="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 text-sm z-50">
        <h1 class="font-normal text-white m-0 text-center">
          Floating Images Gallery
        </h1>
        <p class="text-gray-500 m-0 text-center mt-2.5">Next.js and GSAP</p>
      </div>

      <div ref={plane1} class="w-full h-full absolute filter brightness-70">
        <Card
          image="/assets/avatars/1.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[10%] top-[80%]"
        />
        <Card
          image="/assets/avatars/2.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[5%] top-[65%]"
        />
        <Card
          image="/assets/avatars/3.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[35%] top-[20%]"
        />
      </div>
      <div ref={plane2} class="w-full h-full absolute filter brightness-75">
        <Card
          image="/assets/avatars/4.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[5%] top-[10%]"
        />
        <Card
          image="/assets/avatars/5.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[80%] top-[5%]"
        />
        <Card
          image="/assets/avatars/6.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[60%] top-[60%]"
        />
      </div>
      <div ref={plane3} class="w-full h-full absolute filter brightness-50">
        <Card
          image="/assets/avatars/7.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[45%] top-[2.5%]"
        />
        <Card
          image="/assets/avatars/8.png"
          name="Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[30%] top-[75%]"
        />
      </div>
    </main>
  );
}

export default Header;
