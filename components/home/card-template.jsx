"use client";
import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const CardTemplate = ({
  i,
  src,
  color,
  progress,
  rotate,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], rotate);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className={`h-screen flex flex-col items-center justify-center sticky top-10`}
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale: scale,
          rotate: imageRotate,
          top: `calc(-5vh + ${i * 15}px)`,
        }}
        className={`flex flex-col relative !bg-accent -top-[25%] w-[30rem] h-[35rem] p-4 border-2 border-border rounded-lg transform origin-top`}
      >
        <div className={`w-full relative overflow-hidden rounded-lg h-full`}>
          <motion.div
            className={`inner w-full h-full`}
            style={{ scale: imageScale }}
          >
            <Image
              className="object-cover w-full h-full"
              fill
              src={`${src}`}
              alt="image"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardTemplate;
