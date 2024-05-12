"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";

function CertificationItem({ certification, setEditableId, setIsEdit }) {
  const [loaded, setLoaded] = useState(false);

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }
  return (
    <div
      key={certification.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">
        {certification.issued} —
        {certification?.notExpire ? " Doesn't Expire" : certification?.expires}
      </p>
      <div className="space-y-3 col-span-2">
        <div className={`${certification.hide && "blur-[1.5px]"}`}>
          <a
            href={certification.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {certification.name} at {certification.organization}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500">{certification.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-scroll">
          {certification.images && certification.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {certification.images.map(({ url, id, name }) => (
                <div
                  key={id}
                  className="w-[7.55rem] h-24 bg-indigo-200 rounded-md"
                >
                  <Image
                    width={250}
                    height={150}
                    src={url ? url : "/assets/not-found.jpg"}
                    quality={80}
                    loading="lazy"
                    alt={name}
                    className={`${certification.hide && "blur-[1.5px]"} ${
                      loaded && "unblur"
                    } w-full h-full object-cover rounded cursor-pointer`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <small
            onClick={() =>
              toggleHide("certifications", certification.id, certification.hide)
            }
            className="hover:underline cursor-pointer"
          >
            {certification.hide ? "Show" : "Hide"}
          </small>
          <small
            onClick={() => handleEdit(certification.id)}
            className="hover:underline cursor-pointer"
          >
            Edit
          </small>
          <DeleteItem
            id={certification.id}
            title={certification.title}
            source="certifications"
          >
            <small className="hover:underline cursor-pointer">Delete</small>
          </DeleteItem>
        </div>
      </div>
    </div>
  );
}

export default CertificationItem;
