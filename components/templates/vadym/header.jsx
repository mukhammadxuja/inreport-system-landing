import React from "react";

function VadymHeader() {
  return (
    <header className="grid grid-cols-1 md:grid-cols-2 mt-14 md:mt-20 border border-b-transparent border-gray-200 rounded-t-md p-[24px] w-full">
      <div className="space-y-4 md:space-y-6">
        <h1 className="vadym_heading">
          Building and delivering user-centric experiences through frontend
          development
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2 md:pb-10">
          <a
            href="https://ymwye9tec6w.typeform.com/to/C32Oq4E7"
            target="_blank"
            rel="noopener noreferrer"
            className="vadym_btn_primary"
          >
            Project inquires
          </a>
          <a className="vadym_btn_ghost" id="contact">
            Say hi
          </a>
        </div>
      </div>
      <div></div>
    </header>
  );
}

export default VadymHeader;
