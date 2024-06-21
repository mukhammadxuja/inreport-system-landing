"use client";
import React, { useState } from "react";
import Template from "./template";
import TemplateModal from "./modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Default Template",
    username: "Elsa Jonson",
    avatar: "./assets/avatars/3.png",
    src: "./assets/templates/default/desktop.png",
    color: "#615EFC",
  },
  {
    title: "Bento Grid Template",
    username: "Office Studio",
    avatar: "./assets/avatars/2.png",
    src: "./assets/templates/bento/desktop.png",
    color: "#8C8C8C",
  },
  {
    title: "Minimalistic Template",
    username: "Locomotive",
    avatar: "./assets/avatars/7.png",
    src: "./assets/templates/minimalistic/desktop.png",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    username: "Silencio",
    avatar: "./assets/avatars/9.png",
    src: "./assets/templates/default/desktop.png",
    color: "#706D63",
  },
];

function Templates() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <section id="templates">
      <div className="container mx-auto w-full mt-10 mb-5">
        <h2 className="text-clamp-title items-center">
          <span className="text-muted-foreground">Templates.</span>
          <br />
          Craft Your Vision.
        </h2>
      </div>
      <div className="container mx-auto w-full flex flex-col items-center justify-center">
        {projects.map((project, index) => (
          <Template
            index={index}
            username={project.username}
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
