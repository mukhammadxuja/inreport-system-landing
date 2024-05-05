/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { auth, db } from "@/firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
function AdminPage() {
  const { projects, setProjects } = useApiContext();

  return (
    <div className="px-4 min-h-screen">
      <div className="my-4">
        {projects.map((project) => (
          <div
            key={project.uid}
            className="flex items-start justify-between py-2 pl-2 pr-4 rounded-md"
          >
            <p>{project.year}</p>
            <div className="space-y-3">
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-medium hover:underline cursor-pointer"
                >
                  {project.title} at {project.company}
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-gray-500">{project.description}</p>
              </div>
              <div className="flex items-center gap-3">
                {project.images?.map((image) => (
                  <img
                    key={image.id}
                    className="w-32 rounded"
                    src={image.preview.url}
                    alt="project images"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-2xl">
        <EmailVerificationAlert />
      </div>
    </div>
  );
}

export default AdminPage;
