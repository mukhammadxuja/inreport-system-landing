"use client";
import React, { useState } from "react";
import Template from "./template";
import TemplateModal from "./modal";

const projects = [
  {
    title: "C2 Montreal",
    src: "./assets/avatars/3.png",
    color: "#000000",
  },
  {
    title: "Office Studio",
    src: "./assets/avatars/3.png",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    src: "./assets/avatars/3.png",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "./assets/avatars/3.png",
    color: "#706D63",
  },
];

function Templates() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        {projects.map((project, index) => (
          <Template
            index={index}
            title={project.title}
            setModal={setModal}
            key={index}
          />
        ))}
      </div>
      <TemplateModal modal={modal} projects={projects} />
    </main>
  );
}

export default Templates;
