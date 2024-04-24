"use client";
import React, { useState } from "react";
import {
  Roboto,
  Azeret_Mono,
  Inter,
  Noto_Serif,
  Arimo,
  EB_Garamond,
  Merriweather,
} from "next/font/google";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Bold,
  Italic,
  Underline,
  ChevronDown,
  Grip,
  Copy,
  Scissors,
  Trash2,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  AlignRight,
  List,
  ListOrdered,
  Ban,
  Clipboard,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });
const mono = Azeret_Mono({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const serif = Noto_Serif({ subsets: ["latin"] });
const arial = Arimo({ subsets: ["latin"], variable: "--font-arial" });
const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
});
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

function ResumeNavbar() {
  const [textColor, setTextColor] = useState("blue");
  const [highlight, setHighlight] = useState("indigo");
  const [font, setFont] = useState("inter");
  const [url, setUrl] = useState("");

  console.log(font);

  const colors = [
    {
      classColor: "bg-orange-500",
      color: "orange",
    },
    {
      classColor: "bg-emerald-500",
      color: "emerald",
    },
    {
      classColor: "bg-lime-500",
      color: "lime",
    },
    {
      classColor: "bg-indigo-500",
      color: "indigo",
    },
    {
      classColor: "bg-blue-500",
      color: "blue",
    },
    {
      classColor: "bg-violet-500",
      color: "violet",
    },
    {
      classColor: "bg-pink-500",
      color: "pink",
    },
    {
      classColor: "bg-gray-500",
      color: "gray",
    },
  ];

  const colorVariants = {
    green:
      "bg-green-500 hover:!bg-green-600 focus:!bg-green-500 border !border-green-500 focus:!text-white text-white hover:!text-white",
    red: "bg-rose-500 hover:!bg-rose-600 focus:!bg-rose-500  border !border-rose-500 focus:!text-white text-white hover:!text-white",
    yellow:
      "bg-amber-500 hover:!bg-amber-600 focus:!bg-amber-500 border !border-amber-500 focus:!text-white text-white hover:!text-white",
    gray: "bg-slate-500 hover:!bg-slate-600 focus:!bg-slate-500 border !border-slate-500 focus:!text-white text-white hover:!text-white",
    orange:
      "bg-orange-500 hover:!bg-orange-600 focus:!bg-orange-500 border !border-orange-500 focus:!text-white text-white hover:!text-white",
    lime: "bg-lime-500 hover:!bg-lime-600 focus:!bg-lime-500  border !border-lime-500 focus:!text-white text-white hover:!text-white",
    emerald:
      "bg-emerald-500 hover:!bg-emerald-600 focus:!bg-emerald-500 border !border-emerald-500 focus:!text-white text-white hover:!text-white",
    indigo:
      "bg-indigo-500 hover:!bg-indigo-600 focus:!bg-indigo-500 border !border-indigo-500 focus:!text-white text-white hover:!text-white",
    teal: "bg-teal-500 hover:!bg-teal-600 focus:!bg-teal-500 border !border-teal-500 focus:!text-white text-white hover:!text-white",
    cyan: "bg-cyan-500 hover:!bg-cyan-600 focus:!bg-cyan-500 border !border-cyan-500 focus:!text-white text-white hover:!text-white",
    sky: "bg-sky-500 hover:!bg-sky-600 focus:!bg-sky-500 border !border-sky-500 focus:!text-white text-white hover:!text-white",
    blue: "bg-blue-500 hover:!bg-blue-600 focus:!bg-blue-500 border !border-blue-500 focus:!text-white text-white hover:!text-white",
    violet:
      "bg-violet-500 hover:!bg-violet-600 focus:!bg-violet-500 border !border-violet-500 focus:!text-white text-white hover:!text-white",
    purple:
      "bg-purple-500 hover:!bg-purple-600 focus:!bg-purple-500 border !border-purple-500 focus:!text-white text-white hover:!text-white",
    fuchsia:
      "bg-fuchsia-500 hover:!bg-fuchsia-600 focus:!bg-fuchsia-500 border !border-fuchsia-500 focus:!text-white text-white hover:!text-white",
    pink: "bg-pink-500 hover:!bg-pink-600 focus:!bg-pink-500 border !border-pink-500 focus:!text-white text-white hover:!text-white",
    rose: "bg-rose-500 hover:!bg-rose-600 focus:!bg-rose-500 border !border-rose-500 focus:!text-white text-white hover:!text-white",
  };

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-fit mx-auto p-3 rounded-2xl duration-300 bg-white shadow-lg flex group">
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <Select>
              <TooltipTrigger>
                <SelectTrigger className="w-28 border-none hover:bg-accent duration-300">
                  <SelectValue placeholder="Text size" />
                </SelectTrigger>
              </TooltipTrigger>
              <SelectContent className="w-28">
                <SelectItem check={false} value="header">
                  Header
                </SelectItem>
                <SelectItem check={false} value="title">
                  Title
                </SelectItem>
                <SelectItem check={false} value="subtitle">
                  Subtitle
                </SelectItem>
                <SelectItem check={false} value="normal-text">
                  Normal text
                </SelectItem>
              </SelectContent>
            </Select>
            <TooltipContent>
              <p className="text-xs">Text size</p>
            </TooltipContent>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          <Tooltip>
            <Select value={font} onValueChange={setFont}>
              <TooltipTrigger>
                <SelectTrigger className="w-28 border-none hover:bg-accent duration-300">
                  <SelectValue
                    placeholder="Font"
                    className={garamond.className}
                  />
                </SelectTrigger>
              </TooltipTrigger>
              <SelectContent className="h-54">
                <SelectItem
                  check={false}
                  value="arial"
                  className={arial.className}
                >
                  Arial
                </SelectItem>
                <SelectItem
                  check={false}
                  value="garamond"
                  className={garamond.className}
                >
                  Garamond
                </SelectItem>
                <SelectItem
                  check={false}
                  value="inter"
                  className={inter.className}
                >
                  Inter
                </SelectItem>
                <SelectItem
                  check={false}
                  value="mono"
                  className={mono.className}
                >
                  Mono
                </SelectItem>
                <SelectItem
                  check={false}
                  value="merriweather"
                  className={merriweather.className}
                >
                  Merriweather
                </SelectItem>
                <SelectItem
                  check={false}
                  value="roboto"
                  className={roboto.className}
                >
                  Roboto
                </SelectItem>
                <SelectItem
                  check={false}
                  value="serif"
                  className={serif.className}
                >
                  Serif
                </SelectItem>
              </SelectContent>
            </Select>
            <TooltipContent>
              <p className="text-xs">Font</p>
            </TooltipContent>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <span
                      className={`${colorVariants[textColor]} w-6 h-6 rounded cursor-pointer`}
                    ></span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent align="right" className="flex items-center gap-2">
                <Ban className="w-6 h-6 cursor-pointer hover:opacity-70 duration-300" />
                {colors.map((item) => {
                  return (
                    <button
                      key={item.classColor}
                      className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${
                        colorVariants[item.color]
                      }`}
                      name="color"
                      onClick={() => setTextColor(item.color)}
                    ></button>
                  );
                })}
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Text color</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <span
                      className={`${colorVariants[highlight]} w-6 h-6 rounded cursor-pointer`}
                    ></span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent align="left" className="flex items-center gap-2">
                <Ban className="w-6 h-5 cursor-pointer hover:opacity-70 duration-300" />
                {colors.map((item) => {
                  return (
                    <button
                      key={item.classColor}
                      className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${
                        colorVariants[item.color]
                      }`}
                      name="color"
                      onClick={() => setHighlight(item.color)}
                    ></button>
                  );
                })}
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Highlight</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          <ToggleGroup type="multiple">
            <Tooltip>
              <TooltipTrigger>
                <ToggleGroupItem value="left" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Bold</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Italic</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <Popover>
                <PopoverTrigger>
                  <TooltipTrigger>
                    <Button variant="ghost" className="px-3 group">
                      <Link2 className="h-4 w-4 opacity-100 hover:opacity-50" />
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent className="flex items-center gap-2">
                  <Input placeholder="Your url" />
                  <Button disabled={!url}>Add</Button>
                </PopoverContent>
              </Popover>
              <TooltipContent>
                <p className="text-xs">Paste link</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Underline</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
          <Separator className="h-[80%]" orientation="vertical" />
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <List className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent
                align="left"
                className="w-fit flex items-center gap-2"
              >
                <ToggleGroup type="multiple">
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem value="list" aria-label="Toggle list">
                        <List className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">List</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator className="h-[80%]" orientation="vertical" />
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem
                        value="ordered"
                        aria-label="Toggle ordered"
                      >
                        <ListOrdered className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">List ordered</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Highlight</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <AlignLeft className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent
                align="left"
                className="w-fit flex items-center gap-2"
              >
                <ToggleGroup type="multiple">
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem value="left" aria-label="Toggle left">
                        <AlignLeft className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Align left</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator className="h-[80%]" orientation="vertical" />
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem
                        value="center"
                        aria-label="Toggle center"
                      >
                        <AlignCenter className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Align center</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator className="h-[80%]" orientation="vertical" />
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem
                        value="justify"
                        aria-label="Toggle justify"
                      >
                        <AlignJustify className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Align justify</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator className="h-[80%]" orientation="vertical" />
                  <Tooltip>
                    <TooltipTrigger>
                      <ToggleGroupItem value="right" aria-label="Toggle right">
                        <AlignRight className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Align right</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Highlight</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Grip className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <DropdownMenuContent className="!right-0 w-36">
                <DropdownMenuItem>
                  <Clipboard className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Scissors className="mr-2 h-4 w-4" />
                  <span>Cut</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>
              <p>More</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </nav>
  );
}

export default ResumeNavbar;
