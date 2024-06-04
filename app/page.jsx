"use client";
import Cards from "@/components/home/cards/cards";
import HomeFooter from "@/components/home/footer";
import Header from "@/components/home/header";
import LastSection from "@/components/home/last";
import HomeNavbar from "@/components/home/navbar";
import Templates from "@/components/home/templates/templates";
import { useEffect, useRef } from "react";

import Lenis from "lenis";
import { useScroll } from "framer-motion";
import CardTemplate from "@/components/home/card-template";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Test from "@/components/home/test";
import Image from "next/image";

const projects = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "/assets/avatars/5.png",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    rotate: [3, -2],
    color: "#BBACAF",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    src: "/assets/avatars/6.png",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    rotate: [-4, 2],
    color: "#977F6D",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: "/assets/avatars/7.png",
    link: "https://www.ignant.com/2023//28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    rotate: [10, -2],
    color: "#C2491D",
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: "/assets/avatars/8.png",
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    rotate: [-7, 3],
    color: "#B62429",
  },
  {
    title: "Mark Rammers",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Titled ‘Beginnings’, the mesmerizing collection of images is a visual and meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
    src: "/assets/avatars/9.png",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    rotate: [6, -2],
    color: "#88A28D",
  },
];

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative">
      <HomeNavbar />
      <Header />

      <section id="about" className="container mx-auto">
        <Image
          width={200}
          height={200}
          className="h-screen w-full rounded-lg"
          src="/assets/showcase.webp"
          alt="Showcase ai"
        />
      </section>

      <section ref={container} className="py-16 md:py-20">
        <div className="w-full">
          <h2 className="text-clamp-title items-center text-center">
            <span className="text-muted-foreground">Testimonials.</span>
            <br />
            Our wall of love.
          </h2>
          <Button className="flex items-center gap-1.5 mx-auto mt-5">
            <span>View templates</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <CardTemplate
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
      <Cards />
      <Templates />
      <LastSection />
      <HomeFooter />
    </main>
  );
}
