"use client";
import { useRef } from "react";
import gsap from "gsap";
import Card from "./cards/card";

function Cards() {
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
    gsap.set(plane1.current, {
      x: `+=${xForce * 0.7}`,
      y: `+=${yForce * 0.7}`,
    });
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
      className="h-screen w-screen overflow-hidden relative"
    >
      <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2 text-sm z-50">
        <h1 className="font-normal text-white m-0 text-center">
          Floating Images Gallery
        </h1>
        <p className="text-gray-500 m-0 text-center mt-2.5">Next.js and GSAP</p>
      </div>

      <div
        ref={plane1}
        className="w-full h-full absolute filter brightness-[97%]"
      >
        <Card
          image="/assets/avatars/3.png"
          name="3 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[20%] top-[40%]"
        />
        <Card
          image="/assets/avatars/6.png"
          name="6 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[20%] top-[40%]"
        />
      </div>

      <div
        ref={plane2}
        className="w-full h-full absolute filter brightness-[98%]"
      >
        <Card
          image="/assets/avatars/1.png"
          name="1 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[5%] bottom-[15%]"
        />
        <Card
          image="/assets/avatars/2.png"
          name="2 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[5%] bottom-[15%]"
        />
        <Card
          image="/assets/avatars/4.png"
          name="4 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[5%] top-[15%]"
        />
        <Card
          image="/assets/avatars/5.png"
          name="5 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[5%] top-[15%]"
        />
        <Card
          image="/assets/avatars/7.png"
          name="7 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[-10%] top-[40%]"
        />
        <Card
          image="/assets/avatars/7.png"
          name="7 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[-10%] top-[40%]"
        />
      </div>

      <div
        ref={plane3}
        className="w-full h-full absolute filter brightness-[99%]"
      >
        <Card
          image="/assets/avatars/7.png"
          name="7 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[40%] top-[2.5%]"
        />
        <Card
          image="/assets/avatars/8.png"
          name="8 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[40%] bottom-[2.5%]"
        />

        {/* Out */}
        <Card
          image="/assets/avatars/9.png"
          name="9 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[-10%] -bottom-[6%]"
        />
        <Card
          image="/assets/avatars/2.png"
          name="10 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[-10%] -bottom-[6%]"
        />
        <Card
          image="/assets/avatars/4.png"
          name="11 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="left-[-10%] -top-[6%]"
        />
        <Card
          image="/assets/avatars/5.png"
          name="12 Helen Joe"
          username="@helenjoe"
          job="Animator | Illustrator"
          position="right-[-10%] -top-[6%]"
        />
      </div>
    </main>
  );
}

export default Cards;
