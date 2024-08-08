import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function ContactForm() {
  return (
    <div className="h-auto w-full">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex gap-2 md:gap-4">
          <Input
            className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
            placeholder="Ismingiz"
          />
          <Input
            className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
            placeholder="Email manzil"
          />
        </div>
        <Textarea
          rows={10}
          className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
          placeholder="Bu yerga xabaringizni yozing."
        />
      </div>
      <p className="py-4 md:py-6 text-sm text-muted-foreground border-b-2 border-border">
        Xabaringizni tez orada ko&apos;rib chiqib siz bilan bog&apos;lanishga
        harakat qilamiz.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full py-4 md:py-6">
        <div>
          <p className="text-xs text-muted-foreground -mb-1">
            Email manzilimiz.
          </p>
          <small className="text-xs text-primary font-medium cursor-pointer hover:underline">
            dotsoftuz@gmail.com
          </small>
        </div>
        <Button className="flex items-center gap-1.5 mt-3 md:mt-0">
          <span>Yuborish</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
