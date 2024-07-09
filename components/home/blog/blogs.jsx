"use client";
import React, { useState } from "react";
import Template from "./template";
import TemplateModal from "./modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Elsa Jonson",
    avatar: "./assets/avatars/3.png",
    src: "./assets/templates/default/desktop.png",
    color: "#615EFC",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Office Studio",
    avatar: "./assets/avatars/2.png",
    src: "./assets/templates/bento/desktop.png",
    color: "#8C8C8C",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Locomotive",
    avatar: "./assets/avatars/7.png",
    src: "./assets/templates/minimalistic/desktop.png",
    color: "#EFE8D3",
  },
  {
    title: "Assortimentni boshqarish",
    paragraph:
      "Mijozlarning ma’lumotlar bazasini yaratishning eng muhim 4 sababi",
    username: "Silencio",
    avatar: "./assets/avatars/9.png",
    src: "./assets/templates/default/desktop.png",
    color: "#706D63",
  },
];

function Blog() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <section id="blog">
      <div className="container mx-auto w-full mt-10 mb-5">
        <h2 className="text-clamp-title items-center">
          <span className="text-muted-foreground">Blog.</span>
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
            paragraph={project.paragraph}
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

export default Blog;
