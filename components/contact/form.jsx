import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function ContactForm() {
  return (
    <div className="container mx-auto h-auto w-full max-w-xl mb-10">
      <h1 className="text-center w-full inline-block mt-24 mb-10 md:mt-24 tracking-[1.12] leading-[-.005em] text-clamp font-bold">
        <span className="text-muted-foreground">Contact us.</span>
        <br />
        Your two cents.
      </h1>
      <div className="flex flex-col gap-2 md:gap-4 mt-5 md:mt-10">
        <div className="flex gap-2 md:gap-4">
          <Input
            className="hover:ring-2 hover:ring-yellow-600 md:h-12 active:ring-yellow-700"
            placeholder="Name"
          />
          <Input
            className="hover:ring-2 hover:ring-yellow-600 md:h-12 active:ring-yellow-700"
            placeholder="Email address"
          />
        </div>
        <Textarea
          rows={10}
          className="hover:ring-2 hover:ring-yellow-600 md:h-12 active:ring-yellow-700"
          placeholder="Messages"
        />
      </div>
      <p className="py-4 md:py-6 text-sm text-muted-foreground border-b-2 border-border">
        We are a creativity hatchery, so go ahead and lay us a message with your
        quirky idea or suggestion. We promise we won&apos;t judge for any typos
        or auto-correct fails. Please note that we have specific forms for
        project proposals and job applications, so refer to those if that&apos;s
        your case.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full py-4 md:py-6">
        <div>
          <p className="text-xs text-muted-foreground -mb-1">Hate contact forms?</p>
          <small className="text-xs text-primary font-medium cursor-pointer hover:underline">
            dotsoftuz@gmail.com
          </small>
        </div>
        <Button className="flex items-center gap-1.5 mt-3 md:mt-0">
          <span>Send message</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
