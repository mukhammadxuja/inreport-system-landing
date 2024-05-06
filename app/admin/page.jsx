/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { auth, db } from "@/firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

// TODO: refactor and make sure all function works before transfer to another file
// Hide, Edit, Delete, Active tab with localStorage
// Edit: https://codesandbox.io/p/sandbox/react-hooks-crud-firebase-z7nh3?file=%2Fsrc%2Ftables%2FUserTableRow.js%3A27%2C16-27%2C23

function AdminPage() {
  const { projects, setProjects } = useApiContext();

  return (
    <div className="px-4 min-h-screen">
      <div className="my-4 max-w-2xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.uid}
            className="flex items-start justify-between py-2 pl-2 pr-4 border-b"
          >
            <p>{project.year}</p>
            <div className="space-y-3 w-[25rem]">
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
              <div className="flex items-center gap-3 overflow-x-scroll">
                {project.images && project.images.length > 0 && (
                  <div className="flex items-center gap-2">
                    {/* Map through images and render each */}
                    {project.images.map((image, index) => (
                      <div key={index} className="w-32 rounded-md">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex itemc space-x-2">
                  <small className="hover:underline cursor-pointer">Hide</small>
                  <small className="hover:underline cursor-pointer">Edit</small>
                  <small className="hover:underline cursor-pointer">
                    Delete
                  </small>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
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
