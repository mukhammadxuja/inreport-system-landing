import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

function About({ data }) {
  return (
    <section className="container mx-auto pt-10 md:pt-16 mt-10">
      <div className="w-full">
        <h2 className="text-clamp-title items-center text-center">
          <span className="text-muted-foreground">Barcha vazifalar</span>
          <br />
          uchun bitta yechim.
        </h2>
        <Button className="flex items-center gap-1.5 mx-auto mt-5">
          <span>Ko&apos;proq ma&apos;lumot</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 max-w-5xl mx-auto">
        {data.map((item) => (
          <div
            key={item.title}
            className="bg-white shadow-sm border-2 border-border rounded-lg h-full flex flex-col justify-between"
          >
            <div className="space-y-2 p-6">
              <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
                {item.title}
              </h5>
              <p className="text-lg text-foreground-secondary">
                {item.description}
              </p>
              <Button
                variant="linkHover2"
                className="px-0 flex items-center gap-2.5"
              >
                <span>Ko&apos;proq ma&apos;lumot olish</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="rounded-lg p-4">
              <Image
                width={200}
                height={100}
                className="w-full h-56 rounded-lg object-cover"
                src={item.src}
                alt="statistic image"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
