"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { checkTemplate } from "@/utils";

export function Combobox({
  data,
  templateValue,
  setTemplateValue,
  userTemplate,
}) {
  const [open, setOpen] = useState(false);

  const checkedTemplate = checkTemplate(userTemplate);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {templateValue
            ? data.find((template) => template.value === templateValue)?.label
            : checkedTemplate
            ? checkedTemplate
            : "Select template..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search template..." />
          <CommandEmpty>No template found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data.map((template) => (
                <CommandItem
                  key={template.value}
                  value={template.value}
                  onSelect={(currentValue) => {
                    setTemplateValue(
                      currentValue === templateValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      templateValue === template.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {template.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
