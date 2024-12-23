"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [projectsVisibility, setProjectsVisibility] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Open something
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  // Resume
  const [size, setSize] = useState("normal");
  const [color, setColor] = useState("blue");
  const [highlight, setHighlight] = useState("blue");
  const [font, setFont] = useState("inter");
  const [types, setTypes] = useState([]);
  const [url, setUrl] = useState("");
  const [align, setAlign] = useState("left");
  const [list, setList] = useState("left");

  const colorVariants = {
    green: "bg-green-500",
    red: "bg-rose-500",
    yellow: "bg-amber-500",
    gray: "bg-slate-500",
    orange: "bg-orange-500",
    lime: "bg-lime-500",
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
    cyan: "bg-cyan-500",
    sky: "bg-sky-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    purple: "bg-purple-500",
    fuchsia: "bg-fuchsia-500",
    pink: "bg-pink-500",
    rose: "bg-rose-500",
  };

  const textColorVariants = {
    green: "bg-green-50 hover:!bg-green-100 duration-300 text-green-500",
    red: "bg-red-50 hover:!bg-red-100 duration-300 text-red-500",
    yellow: "bg-amber-50 hover:!bg-amber-100 duration-300 text-amber-500",
    gray: "bg-slate-50 hover:!bg-slate-100 duration-300 text-slate-500",
    orange: "bg-orange-50 hover:!bg-orange-100 duration-300 text-orange-500",
    lime: "bg-lime-50 hover:!bg-lime-100 duration-300 text-lime-500",
    emerald:
      "bg-emerald-50 hover:!bg-emerald-100 duration-300 text-emerald-500",
    indigo: "bg-indigo-50 hover:!bg-indigo-100 duration-300 text-indigo-500",
    teal: "bg-teal-50 hover:!bg-teal-100 duration-300 text-teal-500",
    cyan: "bg-cyan-50 hover:!bg-cyan-100 duration-300 text-cyan-500",
    sky: "bg-sky-50 hover:!bg-sky-100 duration-300 text-sky-500",
    blue: "bg-blue-50 hover:!bg-blue-100 duration-300 text-blue-500",
    violet: "bg-violet-50 hover:!bg-violet-100 duration-300 text-violet-500",
    purple: "bg-purple-50 hover:!bg-purple-100 duration-300 text-purple-500",
    fuchsia:
      "bg-fuchsia-50 hover:!bg-fuchsia-100 duration-300 text-fuchsia-500",
    pink: "bg-pink-50 hover:!bg-pink-100 duration-300 text-pink-500",
    rose: "bg-rose-50 hover:!bg-rose-100 duration-300 text-rose-500",
  };

  const textHighlightVariants = {
    green: "bg-green-500 duration-300",
    red: "bg-red-500 duration-300",
    yellow: "bg-yellow-500 duration-300",
    gray: "bg-gray-500 duration-300",
    orange: "bg-orange-500 duration-300",
    lime: "bg-lime-500 duration-300",
    emerald: "bg-emerald-500 duration-300",
    indigo: "bg-indigo-500 duration-300",
    teal: "bg-teal-500 duration-300",
    cyan: "bg-cyan-500 duration-300",
    sky: "bg-sky-500 duration-300",
    blue: "bg-blue-500 duration-300",
    violet: "bg-violet-500 duration-300",
    purple: "bg-purple-500 duration-300",
    fuchsia: "bg-fuchsia-500 duration-300",
    pink: "bg-pink-500 duration-300",
    rose: "bg-rose-500 duration-300",
  };

  const contextValue = {
    openSidebar,
    setOpenSidebar,
    colorVariants,
    textColorVariants,
    textHighlightVariants,
    projectsVisibility,
    setProjectsVisibility,
    openMobileNav,
    setOpenMobileNav,
    isVisible,
    setIsVisible,
    lastScrollTop,
    setLastScrollTop,

    // resume i think I do not need anymore
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
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
