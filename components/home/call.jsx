import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Phone, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Call() {
  return (
    <div className="fixed bottom-10 right-[1rem] md:right-[3rem] container z-50 duration-500 w-fit">
      <Popover>
        <PopoverTrigger className="inline-block bg-gray-200 p-1 rounded-full cursor-pointer ">
          <Phone className="p-3 w-12 h-12 bg-border rounded-full" />
        </PopoverTrigger>
        <PopoverContent
          className="w-80 bg-accent border-2 border-border"
          align="end"
        >
          <h6>Telefon raqamingiz</h6>
          <p className="text-muted-foreground text-xs">
            Menejerlarimi siz bilan tez orada bo&apos;g&apos;lanishadi.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative">
              <b className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary">
                +998
              </b>
              <Input
                type="number"
                className="pl-16 text-lg placeholder:text-primary font-semibold text-primary"
              />
            </div>
            <Button>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Call;
