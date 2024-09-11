"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DueDatePicker({ className, onChange, value, handleUpdate }) {
  const [date, setDate] = React.useState(value);
  const getDueDate = React.useCallback((date) => {
    return date ? new Date(date).getTime() : undefined;
  }, []);

  const handleSelectDate = (e) => {
    setDate(e);
    if (e === undefined) {
      onChange("");
      handleUpdate();
    }
    if (e?.from && e?.to !== undefined) {
      onChange({ from: getDueDate(e?.from), to: getDueDate(e?.to) });
      handleUpdate();
    }
  };

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "text-xs justify-center mx-auto w-full font-normal hover:!bg-white dark:hover:!bg-background",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
                </>
              ) : (
                format(date.from, "MMM dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => handleSelectDate(e)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
