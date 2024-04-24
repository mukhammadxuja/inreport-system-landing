/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { Eye, Gift, Github, GripVertical, Linkedin } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import VadymNavbar from "@/components/templates/vadym/navbar";
import VadymHeader from "@/components/templates/vadym/header";

function SectionsPage() {
  const [header, setHeader] = useState(true);
  const [about, setAbout] = useState(false);
  const [projects, setProjects] = useState(false);

  const [openToWork, setOpenToWork] = useState(true);
  return (
    <Drawer>
      <div className="p-4 min-h-screen">
        <div className="sticky top-4 z-40 flex items-center gap-3 w-full">
          <div className="flex items-center justify-between w-full max-w-xl shadow-lg rounded-lg bg-white px-5 py-3">
            <h3 className="text-sm font-bold">Jump to:</h3>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Header</SelectItem>
                  <SelectItem value="about">About</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="work-history">Work History</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-fit flex items-center gap-2 shadow-lg rounded-lg bg-white px-5 py-3">
            <DrawerTrigger asChild>
              <Button variant="secondary" className="gap-1.5">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </DrawerTrigger>
            <Button className="gap-1.5">
              <Gift className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </div>

        <div>
          <div className="card flex items-center gap-4">
            <GripVertical className="h-6 w-6 text-gray-500  cursor-grab" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-600">
                  Header Section
                </h2>
                <Switch
                  checked={header}
                  onCheckedChange={setHeader}
                  className="ml-auto"
                />
              </div>

              <div className={!header ? "hidden" : "block mt-2"}>
                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Heading</Label>

                    <Textarea
                      disabled={!header}
                      placeholder="Building and delivering user-centric experiences through frontend development"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Paragraph</Label>

                    <Input disabled={!header} placeholder="Paragraph" />
                  </div>
                </div>

                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Address</Label>

                    <Input
                      disabled={!header}
                      placeholder="Tashkent, Uzbekistan"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">Open to work</Label>

                    <Switch
                      disabled={!header}
                      checked={openToWork}
                      onCheckedChange={setOpenToWork}
                    />
                  </div>
                </div>

                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Github account</Label>

                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      <Input
                        disabled={!header}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Linkedin account</Label>

                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5" />
                      <Input
                        disabled={!header}
                        placeholder="https://linkedin.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="about"
            className={`card flex items-center gap-4 duration-300 overflow-hidden`}
          >
            <GripVertical className="h-6 w-6 text-gray-500  cursor-grab" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-600">
                  About Section
                </h2>
                <Switch
                  checked={about}
                  onCheckedChange={setAbout}
                  className="ml-auto"
                />
              </div>

              <div className={!about ? "hidden" : "block mt-2"}>
                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Heading</Label>

                    <Input disabled={!about} placeholder="Heading" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Paragraph</Label>

                    <Input disabled={!about} placeholder="Paragraph" />
                  </div>
                </div>

                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Github account</Label>

                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      <Input
                        disabled={!about}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Linkedin account</Label>

                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5" />
                      <Input
                        disabled={!about}
                        placeholder="https://linkedin.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="projects"
            className={`card flex items-center gap-4 duration-300 overflow-hidden`}
          >
            <GripVertical className="h-6 w-6 text-gray-500  cursor-grab" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-600">
                  Projects Section
                </h2>
                <Switch
                  checked={projects}
                  onCheckedChange={setProjects}
                  className="ml-auto"
                />
              </div>

              <div className={!projects ? "hidden" : "block mt-2"}>
                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Heading</Label>

                    <div className="relative">
                      <label
                        title="Click to upload"
                        for="button2"
                        className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <div className="relative">
                          <img
                            className="w-12"
                            src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                            alt="file upload icon"
                            width="512"
                            height="512"
                          />
                        </div>
                        <div className="relative">
                          <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
                            Upload a file
                          </span>
                          <span className="mt-0.5 block text-sm text-gray-500">
                            Max 2 MB
                          </span>
                        </div>
                      </label>
                      <input
                        hidden=""
                        type="file"
                        name="button2"
                        id="button2"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Paragraph</Label>

                    <Input disabled={!about} placeholder="Paragraph" />
                  </div>
                </div>

                <div className="space-y-3 w-full p-3 rounded-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Github account</Label>

                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      <Input
                        disabled={!about}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Linkedin account</Label>

                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5" />
                      <Input
                        disabled={!about}
                        placeholder="https://linkedin.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DrawerContent className="h-[90vh]">
          <div className="mx-auto w-full max-w-[896px] h-full">
            <DrawerHeader>
              <VadymNavbar />
            </DrawerHeader>
            <main className="w-full">
              <VadymHeader />
              <VadymHeader />
              <VadymHeader />
              <VadymHeader />
            </main>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}

export default SectionsPage;
