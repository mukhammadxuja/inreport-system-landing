/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

function FAQ() {
  const t = useTranslations();

  const faqData = [
    {
      value: "item-1",
      title: t("faq-1"),
      desc: t("faq-1-text"),
    },
    {
      value: "item-2",
      title: t("faq-2"),
      desc: t("faq-2-text"),
    },
    {
      value: "item-3",
      title: t("faq-3"),
      desc: t("faq-3-text"),
    },
    {
      value: "item-4",
      title: t("faq-4"),
      desc: t("faq-4-text"),
    },
    {
      value: "item-5",
      title: t("faq-5"),
      desc: t("faq-5-text"),
    },
    {
      value: "item-6",
      title: t("faq-6"),
      desc: t("faq-6-text"),
    },
  ];
  return (
    <section className="container mx-auto my-10 md:my-16 max-w-4xl">
      <h2 className="text-clamp-title items-center text-center mt-10 mb-5">
        Ko&apos;p beriladigan
        <span className="text-muted-foreground"> savollar</span>
      </h2>
      <Accordion className="mt-10 space-y-2" type="single" collapsible>
        {faqData.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent>{faq.desc}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQ;
