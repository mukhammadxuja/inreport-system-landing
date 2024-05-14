"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./button";

export const ImageViewer = ({ images, selectedImageIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="fixed top-0 !mt-0 left-0 h-screen w-full z-[100000] flex flex-col
      items-center bg-black bg-opacity-80 backdrop-blur"
    >
      <div className="mx-4">
        <Image
          width={400}
          height={400}
          quality={80}
          loading="lazy"
          className="h-[80vh] w-auto rounded-md object-cover mt-4 md:mt-8 xl:mt-12"
          src={images[selectedImageIndex].url}
          alt={`Image ${currentImageIndex + 1}`}
        />
      </div>
      <div className="absolute bottom-4 my-4 !px-4 md:!px-10 flex items-center justify-between w-full gap-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="rounded-r-none border-r border-r-gray-300 px-6"
            onClick={prevImage}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none px-6"
            onClick={nextImage}
          >
            Next
          </Button>
        </div>
        <Button variant="outline" className="hover:bg-white cursor-text">{`${
          currentImageIndex + 1
        }/${images.length}`}</Button>
      </div>
    </div>
  );
};
