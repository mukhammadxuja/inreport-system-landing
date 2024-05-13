"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";

function AwardItem({ award, setEditableId, setIsEdit }) {
  const [loaded, setLoaded] = useState(false);

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }
  return (
    <div
      key={award.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">{award.year}</p>
      <div className="space-y-3 col-span-2">
        <div className={`${award.hide && "blur-[1.5px]"}`}>
          <a
            href={award.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {award.title} at {award.presentedBy}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500">{award.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-scroll">
          {award.images && award.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {award.images.map(({ url, id, name }) => (
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
                    className={`${award.hide && "blur-[1.5px]"} ${
                      loaded && "unblur"
                    } w-full h-full object-cover rounded cursor-pointer`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <small
              onClick={() => toggleHide("awards", award.id, award.hide)}
              className="hover:underline cursor-pointer"
            >
              {award.hide ? "Show" : "Hide"}
            </small>
            <small
              onClick={() => handleEdit(award.id)}
              className="hover:underline cursor-pointer"
            >
              Edit
            </small>
            <DeleteItem id={award.id} title={award.title} source="awards">
              <small className="hover:underline cursor-pointer">Delete</small>
            </DeleteItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardItem;
