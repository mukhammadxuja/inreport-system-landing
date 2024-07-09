"use client";
import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CardTemplate = ({
  i,
  src,
  color,
  title,
  description,
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
      className={`h-[90vh] lg:h-screen flex flex-col items-center justify-center sticky top-10`}
    >
      <motion.div
        style={{
          backgroundColor: color,
          top: `calc(-5vh + ${i * 15}px)`,
        }}
        className={`w-full max-w-5xl mx-4 md:mx-auto flex flex-col relative !bg-accent -top-[25%] h-[25rem] lg:h-[35rem] px-5 py-7 lg:p-5 border-2 border-border rounded-lg transform origin-top`}
      >
        <div className={`w-full relative overflow-hidden h-full`}>
          <motion.div
            className={`grid grid-cols-1 md:grid-cols-2 items-center`}
          >
            <div className="md:pl-5 lg:pl-10 max-w-[90%] space-y-3 md:space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold max-w-80 leading-[2rem]">
                {title}
              </h3>
              <p className="text-lg font-medium leading-[1.5rem]">
                {description}
              </p>
              <Button className="flex items-center gap-1.5">
                <span>Bepul sinash</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            <Image
              // style={{ scale: imageScale }}
              width={300}
              height={300}
              className="hidden lg:block w-full h-[22rem] lg:h-[33rem] rounded-lg object-cover"
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
