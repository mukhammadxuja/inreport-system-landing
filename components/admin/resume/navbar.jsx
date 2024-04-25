"use client";
import React, { useState } from "react";
import { inter, mono, roboto, serif, arial, merriweather } from "@/lib/fonts";

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
  Shell,
  Check,
  Minus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMainContext } from "@/context/main-context";

function ResumeNavbar() {
  const {
    size,
    setSize,
    color,
    setColor,
    highlight,
    setHighlight,
    font,
    setFont,
    types,
    setTypes,
    url,
    setUrl,
    align,
    setAlign,
    list,
    setList,
    colorVariants,
    textColorVariants,
    textHighlightVariants,
  } = useMainContext();

  const colors = [
    {
      bgColor: "bg-green-500",
      color: "green",
    },
    {
      bgColor: "bg-red-500",
      color: "red",
    },
    {
      bgColor: "bg-yellow-500",
      color: "yellow",
    },
    {
      bgColor: "bg-gray-500",
      color: "gray",
    },
    {
      bgColor: "bg-orange-500",
      color: "orange",
    },
    {
      bgColor: "bg-lime-500",
      color: "lime",
    },
    {
      bgColor: "bg-emerald-500",
      color: "emerald",
    },
    {
      bgColor: "bg-indigo-500",
      color: "indigo",
    },
    {
      bgColor: "bg-teal-500",
      color: "teal",
    },
    {
      bgColor: "bg-cyan-500",
      color: "cyan",
    },
    {
      bgColor: "bg-sky-500",
      color: "sky",
    },
    {
      bgColor: "bg-blue-500",
      color: "blue",
    },
    {
      bgColor: "bg-violet-500",
      color: "violet",
    },
    {
      bgColor: "bg-purple-500",
      color: "purple",
    },
    {
      bgColor: "bg-fuchsia-500",
      color: "fuchsia",
    },
    {
      bgColor: "bg-pink-500",
      color: "pink",
    },
    {
      bgColor: "bg-rose-500",
      color: "rose",
    },
  ];

  return (
    <nav className="sticky top-4 z-40 flex items-center gap-3 w-fit mx-auto p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group">
      <TooltipProvider>
        <div className="flex items-center gap-1">
          {/* Font Size */}
          <Tooltip>
            <Select value={size} onValueChange={setSize}>
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
                <SelectItem check={false} value="normal">
                  Normal
                </SelectItem>
              </SelectContent>
            </Select>
            <TooltipContent>
              <p className="text-xs">Text size</p>
            </TooltipContent>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          {/* Text Font */}
          <Tooltip>
            <Select value={font} onValueChange={setFont}>
              <TooltipTrigger>
                <SelectTrigger className="w-28 border-none hover:bg-accent duration-300">
                  <SelectValue placeholder="Font" className={font.className} />
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
          {/* Text Color */}
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3"
                  >
                    <button
                      className={`${colorVariants[color]} ${
                        color === "" && "shadow-md"
                      } w-6 h-6 rounded cursor-pointer`}
                    ></button>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent
                align="right"
                className="grid gap-2 grid-cols-9 grid-rows-2"
              >
                <Ban
                  onClick={() => setColor("")}
                  className="w-6 h-6 cursor-pointer hover:opacity-70 duration-300"
                />
                {colors.map((item) => {
                  return (
                    <button
                      key={item.bgColor}
                      className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${
                        colorVariants[item.color]
                      }`}
                      name="color"
                      onClick={() => setColor(item.color)}
                    >
                      {color === item.color && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                  );
                })}
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Text color</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          {/* Highlight */}
          <Tooltip>
            <Popover>
              <TooltipTrigger>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3"
                  >
                    <span
                      className={`${textHighlightVariants[highlight]}  ${
                        highlight === "" && "shadow-md"
                      } bg-opacity-50 hover:bg-opacity-70 w-6 h-6 rounded cursor-pointer`}
                    ></span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent
                align="left"
                className="grid gap-2 grid-cols-9 grid-rows-2"
              >
                <Ban
                  onClick={() => setHighlight("")}
                  className="w-6 h-5 cursor-pointer hover:opacity-70 duration-300"
                />
                {colors.map((item) => {
                  return (
                    <button
                      key={item.bgColor}
                      className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${
                        textHighlightVariants[item.color]
                      } bg-opacity-50 hover:bg-opacity-70`}
                      name="color"
                      onClick={() => setHighlight(item.color)}
                    >
                      {highlight === item.color && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                  );
                })}
              </PopoverContent>
              <TooltipContent>
                <p className="text-xs">Highlight</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          {/* Text Types */}
          <ToggleGroup value={types} onValueChange={setTypes} type="multiple">
            <Tooltip>
              <TooltipTrigger>
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
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
                    <ToggleGroupItem value="url" aria-label="Toggle italic">
                      <Link2 className="h-4 w-4" />
                    </ToggleGroupItem>
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
          {/* List */}
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
                <ToggleGroup
                  defaultValue="list"
                  value={list}
                  onValueChange={setList}
                  type="single"
                >
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
                <p className="text-xs">List</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          {/* Text Align */}
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
                <ToggleGroup
                  defaultValue="left"
                  value={align}
                  onValueChange={setAlign}
                  type="single"
                >
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
                <p className="text-xs">Align</p>
              </TooltipContent>
            </Popover>
          </Tooltip>
          <Separator className="h-[80%]" orientation="vertical" />
          {/* More */}
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
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
