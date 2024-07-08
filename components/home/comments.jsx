"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Lenis from "lenis";
import { useEffect } from "react";

function Comments() {
  useEffect(() => {
    const lenis = new Lenis({
      // You can adjust the following parameters according to your needs
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      direction: "vertical", // 'vertical' or 'horizontal'
      gestureDirection: "vertical", // 'vertical' or 'horizontal'
      smooth: true, // Enable or disable smooth scrolling
      smoothTouch: false, // Enable or disable smooth scrolling on touch devices
      infinite: false, // Enable or disable infinite scrolling
    });

    // Animation frame loop to update Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis instance
    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <section className="my-10 md:my-16">
      <div className="w-full mt-4 md:mt-0">
        <h2 className="text-clamp-title items-center text-center">
          <span className="text-muted-foreground">Testimonials.</span>
          <br />
          Our wall of love.
        </h2>
        <Button className="flex items-center gap-1.5 mx-auto mt-2 md:mt-5">
          <span>View all comments</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
      <div className="py-5 container mx-auto">
        <div className="w-full mt-4 md:mt-0">
          <div className="py-2 md:py-4 lg:py-10 not-rich-text max-w-lg">
            <p className="py-4 text-xl md:text-2xl/7 font-semibold md:py-0">
              <span className="bg-border">
                “Significa&apos;s impressive expertise and strategy advisory
                were crucial to achieving our goals. The experience was great in
                all dimensions.”
              </span>
            </p>
            <div className="overflow-hidden mt-2 md:mt-6">
              <p className="text-base font-semibold leading-none">
                Rafael Sardinha
              </p>{" "}
              <p
                title="CEO at Bion"
                className="mt-1 text-base font-semibold leading-none text-foreground-secondary whitespace-nowrap text-ellipsis overflow-hidden"
              >
                CEO at Bion
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 md:mt-0">
          <div className="py-2 md:py-4 lg:py-10 not-rich-text max-w-lg ml-auto text-right md:text-left">
            <p className="py-4 text-xl md:text-2xl/7 font-semibold md:py-0">
              <span className="bg-border">
                “Significa&apos;s impressive expertise and strategy advisory
                were crucial to achieving our goals. The experience was great in
                all dimensions.”
              </span>
            </p>
            <div className="overflow-hidden mt-2 md:mt-6">
              <p className="text-base font-semibold leading-none">
                Rafael Sardinha
              </p>{" "}
              <p
                title="CEO at Bion"
                className="mt-1 text-base font-semibold leading-none text-foreground-secondary whitespace-nowrap text-ellipsis overflow-hidden"
              >
                CEO at Bion
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 md:mt-0">
          <div className="py-2 md:py-4 lg:py-10 not-rich-text max-w-lg">
            <p className="py-4 text-xl md:text-2xl/7 font-semibold md:py-0">
              <span className="bg-border">
                “Significa&apos;s impressive expertise and strategy advisory
                were crucial to achieving our goals. The experience was great in
                all dimensions.”
              </span>
            </p>
            <div className="overflow-hidden mt-2 md:mt-6">
              <p className="text-base font-semibold leading-none">
                Rafael Sardinha
              </p>{" "}
              <p
                title="CEO at Bion"
                className="mt-1 text-base font-semibold leading-none text-foreground-secondary whitespace-nowrap text-ellipsis overflow-hidden"
              >
                CEO at Bion
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 md:mt-0">
          <div className="py-2 md:py-4 lg:py-10 not-rich-text max-w-lg ml-auto text-right md:text-left">
            <p className="py-4 text-xl md:text-2xl/7 font-semibold md:py-0">
              <span className="bg-border">
                “Significa&apos;s impressive expertise and strategy advisory
                were crucial to achieving our goals. The experience was great in
                all dimensions.”
              </span>
            </p>
            <div className="overflow-hidden mt-2 md:mt-6">
              <p className="text-base font-semibold leading-none">
                Rafael Sardinha
              </p>{" "}
              <p
                title="CEO at Bion"
                className="mt-1 text-base font-semibold leading-none text-foreground-secondary whitespace-nowrap text-ellipsis overflow-hidden"
              >
                CEO at Bion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comments;
