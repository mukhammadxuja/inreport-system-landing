import React from "react";
import Content from "./content";

function HomeFooter() {
  return (
    <div
      className="relative h-[60vh] -mt-2"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[60vh] w-full">
        <Content />
      </div>
    </div>
  );
}

export default HomeFooter;
