/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  return (
    <section className="container mx-auto my-10 md:my-16 max-w-4xl">
      <h2 className="text-clamp-title items-center text-center mt-10 mb-5">
        Ko&apos;p beriladigan
        <span className="text-muted-foreground"> savollar</span>
      </h2>
      <Accordion className="mt-10 space-y-2" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            We are a creativity hatchery, so go ahead and lay us a message with
            your quirky idea or suggestion. We promise we won&apos;t judge for
            any typos or auto-correct fails. Please note that we have specific
            forms for project proposals and job applications, so refer to those
            if that&apos;s your case.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-lg font-semibold">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default FAQ;
