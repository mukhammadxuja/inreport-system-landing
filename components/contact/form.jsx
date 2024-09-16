import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function ContactForm() {
  const t = useTranslations();
  const form = useRef();
  const { toast } = useToast();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cg9hipg", // Replace with your EmailJS service ID
        "template_htxj4xt", // Replace with your EmailJS template ID
        form.current,
        "77VLn3jKfKy5LJPvj" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result);
          form.current.reset();
          toast({
            title: "Message sent successfully!",
          });
        },
        (error) => {
          console.log(error.text);
          toast({
            title: "Failed to send message. Please try again later.",
          });
        }
      );
  };

  return (
    <div className="h-auto w-full">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-2 md:gap-4"
      >
        <div className="flex gap-2 md:gap-4">
          <Input
            type="text"
            name="user_name"
            className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
            placeholder={t("Ismingiz")}
            required
          />
          <Input
            type="email"
            name="user_email"
            className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
            placeholder={t("Email manzil")}
            required
          />
        </div>
        <Textarea
          name="message"
          rows={10}
          className="hover:ring-2 hover:ring-transparent md:h-12 active:ring-primary"
          placeholder={t("Bu yerga xabaringizni yozing")}
          required
        />
        <p className="py-4 md:py-6 text-sm text-muted-foreground border-b-2 border-border">
          {t("contact-with-client")}
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full py-4 md:py-6">
          <div>
            <p className="text-xs text-muted-foreground -mb-1">
              {t("Email manzilimiz")}:
            </p>
            <small className="text-xs text-primary font-medium cursor-pointer hover:underline">
              dotsoftuz@gmail.com
            </small>
          </div>
          <Button
            type="submit"
            className="flex items-center gap-1.5 mt-3 md:mt-0"
          >
            <span>{t("Yuborish")}</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
