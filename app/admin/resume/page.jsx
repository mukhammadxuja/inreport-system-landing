"use client";
import ResumeNavbar from "@/components/admin/resume/navbar";
import { useMainContext } from "@/context/main-context";
import React from "react";

function ResumePage() {
  const {
    size,
    setSize,
    color,
    setColor,
    highlight,
    setHighlight,
    font,
    setFont,
    types,
    setTypes,
    url,
    setUrl,
    align,
    setAlign,
    list,
    setList,
    colorVariants,
    textColorVariants,
  } = useMainContext();

  const sizeStyles = {
    header: "text-[50px] font-bold h-fi",
    title: "text-[30px] font-semibold",
    subtitle: "text-[23px] font-medium",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    justify: "text-justify",
    right: "text-right",
  };

  const style = sizeStyles[size] || "";
  const alignS = alignStyles[align] || "";
  const highlightS = colorVariants[highlight] || "";

  console.log(types);

  const bold = types.includes("bold") && "font-bold";
  const italic = types.includes("italic") && "italic";
  const underline = types.includes("underline") && "underline";
  return (
    <div className="p-4 min-h-screen">
      <ResumeNavbar />
      <div className="relative border bg-white w-[1240px] h-[1754px] py-10 px-20 rounded-sm mx-auto my-10">
        <p
          className={`text-base h-fit ${style} ${alignS} ${highlightS} ${bold} ${italic} ${underline} bg-opacity-40 hover:bg-opacity-50 duration-300`}
        >
          {color}
        </p>
      </div>
    </div>
  );
}

export default ResumePage;
