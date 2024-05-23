import React from "react";

export default function Template({ index, title, setModal }) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="flex w-full justify-between items-center px-[100px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 last:border-b last:border-gray-300 hover:opacity-50"
    >
      <h2 className="text-[60px] m-0 font-normal transition-all duration-400 hover:-translate-x-[10px]">
        {title}
      </h2>
      <p className="transition-all duration-400 font-light hover:translate-x-[10px]">
        Design & Development
      </p>
    </div>
  );
}
