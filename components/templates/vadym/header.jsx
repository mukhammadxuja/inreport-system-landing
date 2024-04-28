import { useMainContext } from "@/context/main-context";
import React from "react";

function VadymHeader() {
  const { portfolioData, setPortfolioData } = useMainContext();
  return (
    <header className="grid grid-cols-1 md:grid-cols-2 mt-14 md:mt-20 border border-b-transparent border-gray-200 rounded-t-md p-[24px] w-full">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-1">
          <h5 className="vadym_paragraph font-semibold text-black">
            {portfolioData.name ? portfolioData.name : "Vadym Drut"}
          </h5>
          <p className="vadym_paragraph">
            {portfolioData.position
              ? portfolioData.position
              : "Product Designer"}
          </p>
        </div>

        <h1 className="vadym_heading">
          {portfolioData.heading
            ? portfolioData.heading
            : "Building and delivering user-centric experiences through frontend development"}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2 md:pb-10">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="vadym_btn_primary"
          >
            Project inquires
          </a>
          <a
            className="vadym_btn_ghost"
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="contact"
          >
            Say hi
          </a>
        </div>
      </div>
      <div></div>
    </header>
  );
}

export default VadymHeader;
