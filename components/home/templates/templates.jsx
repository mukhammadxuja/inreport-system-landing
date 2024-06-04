"use client";
import React, { useState } from "react";
import Template from "./template";
import TemplateModal from "./modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Elsa Jonson",
    avatar: "./assets/avatars/3.png",
    src: "./assets/avatars/3.png",
    color: "#615EFC",
  },
  {
    title: "Office Studio",
    avatar: "./assets/avatars/2.png",
    src: "./assets/avatars/3.png",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    avatar: "./assets/avatars/7.png",
    src: "./assets/avatars/3.png",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    avatar: "./assets/avatars/9.png",
    src: "./assets/avatars/3.png",
    color: "#706D63",
  },
];

function Templates() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <section id="templates">
      <div className="container mx-auto w-full mt-10 mb-5">
        <h2 className="text-clamp-title items-center">
          <span className="text-muted-foreground">Blog.</span>
          <br />
          Our very own magazine.
        </h2>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {projects.map((project, index) => (
          <Template
            index={index}
            title={project.title}
            avatar={project.avatar}
            setModal={setModal}
            key={index}
          />
        ))}
      </div>
      <TemplateModal modal={modal} projects={projects} />
    </section>
  );
}

export default Templates;
