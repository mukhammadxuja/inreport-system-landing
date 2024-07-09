"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import "regenerator-runtime/runtime";
import * as Phys from "react-dom-box2d";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Shapes from "./floating-shape/shapes";

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  return (
    <div id="contact" className="relative h-[50vh] lg:h-[70vh]">
      {/* <Shapes /> */}
      <div className="absolute z-20 flex flex-col justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-2">
        <h2 className="text-clamp-title text-center whitespace-nowrap">
          Biz bilan
          <span className="text-muted-foreground"> bog&apos;laning</span>
        </h2>
        <div className="flex items-center gap-2 mx-auto">
          <Input
            className="w-full md:w-72"
            placeholder="Ma'lumotlaringizni yozing."
          />
          <Button>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
