/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import "regenerator-runtime/runtime";
import emailjs from "@emailjs/browser";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "../ui/use-toast";

function Contact() {
  const ref = useRef(null);
  const { toast } = useToast();
  const isInView = useInView(ref);

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  const form = useRef();

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
          console.log(result.text);
          form.current.reset();
          toast({
            title: "Phone number sent successfully!",
          });
        },
        (error) => {
          console.log(error.text);
          toast({
            title: "Failed to send phone number. Please try again later.",
          });
        }
      );
  };

  return (
    <div id="contact" className="relative h-[50vh] lg:h-screen">
      {/* <Shapes /> */}
      <img
        className="w-full h-full absolute top-0 left-0 z-10 object-cover"
        src="https://flow-computing.com/uploads/images/transforms/_xlargeWebp/1868/flow-bubble.webp"
        alt="Contact image"
      />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="absolute z-20 flex flex-col justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-2"
      >
        <h2 className="text-clamp-title text-center whitespace-nowrap">
          Biz bilan
          <span className="text-muted-foreground"> bog&apos;laning</span>
        </h2>
        <div className="flex items-center gap-2 mx-auto">
          <div className="relative">
            <b className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary">
              +998
            </b>
            <Input
              type="text" // Use type="text" for custom validation
              name="user_phone" // Name for EmailJS template
              maxLength={9} // Restrict to 9 digits
              pattern="\d{9}" // Pattern to ensure 9 digits
              className="pl-16 h-11 md:w-72 text-lg placeholder:text-muted font-semibold text-primary"
              placeholder=""
              required // Ensure this field is filled
            />
          </div>
          <Button>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
