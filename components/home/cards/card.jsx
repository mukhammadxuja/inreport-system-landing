import Image from "next/image";
import React from "react";

function Card({ image, name, username, job, position }) {
  return (
    <div
      className={`absolute bg-accent border-2 border-border shadow-lg rounded-lg py-4 px-6 gap-4 flex items-center ${position}`}
    >
      <div className="!rounded-lg">
        <Image
          width={100}
          height={100}
          className="w-20 h-20 !rounded-lg"
          src={image}
          alt="User image"
        />
      </div>
      <div className="">
        <h4 className="text-lg font-bold">{name}</h4>
        <div className="space-y-1 -mt-2">
          <small className="font-medium">{username}</small>
          <p className="text-sm mt-1 font-normal">{job}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
