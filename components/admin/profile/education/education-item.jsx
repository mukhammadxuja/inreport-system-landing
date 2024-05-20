"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";
import { ImageViewer } from "@/components/ui/image-viewer";

function EducationItem({ education, setEditableId, setIsEdit }) {
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
      key={education.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">
        {education.from} —{education?.present ? " Present" : education?.to}
      </p>
      <div className="space-y-3 col-span-2">
        <div className={`${education.hide && "blur-[1.5px]"}`}>
          <a
            href={education.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {education.degree} at {education.school}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500">{education.location}</p>
          <p className="text-gray-500">{education.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          {education.images && education.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {education.images.map(({ url, id, name }, index) => (
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
                    className={`${education.hide && "blur-[1.5px]"} ${
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
            images={education?.images}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={closeImageViewer}
          />
        )}
        <div className="flex items-center space-x-2">
          <small
            onClick={() =>
              toggleHide("educations", education.id, education.hide)
            }
            className="hover:underline cursor-pointer"
          >
            {education.hide ? "Show" : "Hide"}
          </small>
          <small
            onClick={() => handleEdit(education.id)}
            className="hover:underline cursor-pointer"
          >
            Edit
          </small>
          <DeleteItem
            id={education.id}
            title={education.title}
            source="educations"
          >
            <small className="hover:underline cursor-pointer">Delete</small>
          </DeleteItem>
        </div>
      </div>
    </div>
  );
}

export default EducationItem;
