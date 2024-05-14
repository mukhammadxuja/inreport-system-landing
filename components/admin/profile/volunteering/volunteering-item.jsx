"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";
import { ImageViewer } from "@/components/ui/image-viewer";

function EducationItem({ volunteering, setEditableId, setIsEdit }) {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setShowViewer(true);
  };

  const closeImageViewer = () => {
    setShowViewer(false);
  };
  return (
    <div
      key={volunteering.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">
        {volunteering.from} —
        {volunteering?.present ? " Present" : volunteering?.to}
      </p>
      <div className="space-y-3 col-span-2">
        <div className={`${volunteering.hide && "blur-[1.5px]"}`}>
          <a
            href={volunteering.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {volunteering.title} at {volunteering.organization}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500">{volunteering.location}</p>
          <p className="text-gray-500">{volunteering.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-scroll">
          {volunteering.images && volunteering.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {volunteering.images.map(({ url, id, name }, index) => (
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
                    onClick={() => openImageViewer(index)}
                    className={`${volunteering.hide && "blur-[1.5px]"} ${
                      loaded && "unblur"
                    } w-full h-full object-cover rounded cursor-pointer`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {showViewer && (
          <ImageViewer
            images={volunteering?.images}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={closeImageViewer}
          />
        )}
        <div className="flex items-center space-x-2">
          <small
            onClick={() =>
              toggleHide("volunteerings", volunteering.id, volunteering.hide)
            }
            className="hover:underline cursor-pointer"
          >
            {volunteering.hide ? "Show" : "Hide"}
          </small>
          <small
            onClick={() => handleEdit(volunteering.id)}
            className="hover:underline cursor-pointer"
          >
            Edit
          </small>
          <DeleteItem
            id={volunteering.id}
            title={volunteering.title}
            source="volunteerings"
          >
            <small className="hover:underline cursor-pointer">Delete</small>
          </DeleteItem>
        </div>
      </div>
    </div>
  );
}

export default EducationItem;
