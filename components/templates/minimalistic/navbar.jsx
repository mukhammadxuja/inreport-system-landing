"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function MinimalisticNavbar({ data, scrollToSection }) {
  const {
    userData,
    awards,
    projects,
    contacts,
    sideProjects,
    educations,
    experiences,
    volunteerings,
    certifications,
  } = data;

  const minimalisticNavData = [
    {
      id: "all",
      title: "All",
      isCreated: true,
    },
    {
      id: "experiences",
      title: "Experiences",
      isCreated: experiences.length > 0,
    },
    {
      id: "educations",
      title: "Educations",
      isCreated: educations.length > 0,
    },
    {
      id: "projects",
      title: "Projects",
      isCreated: projects.length > 0,
    },
    {
      id: "sideProjects",
      title: "Side Projects",
      isCreated: sideProjects.length > 0,
    },
    {
      id: "certifications",
      title: "Certification",
      isCreated: certifications.length > 0,
    },
    {
      id: "awards",
      title: "Awards",
      isCreated: awards.length > 0,
    },
    {
      id: "volunteerings",
      title: "Volunteerings",
      isCreated: volunteerings.length > 0,
    },
    {
      id: "contacts",
      title: "Contacts",
      isCreated: contacts.length > 0,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);

  // Show button when page is scrolled up to 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const visibleNavData = minimalisticNavData.filter((item) => item.isCreated);
  return (
    <nav className="fixed z-[60] bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 py-1.5 pl-4 pr-2 border border-border bg-white rounded-full shadow-xl overflow-auto w-full md:w-fit">
      <ul className="relative flex items-center gap-2 md:gap-3">
        {visibleNavData.map((nav) => (
          <li
            key={nav.id}
            className={`cursor-pointer text-sm whitespace-nowrap transition duration-300 ease-in-out ${
              hoveredNavItem !== null && hoveredNavItem !== nav.title
                ? "blur-[1px]"
                : ""
            }`}
            onClick={() => scrollToSection(nav.id)}
            onMouseEnter={() => setHoveredNavItem(nav.title)}
            onMouseLeave={() => setHoveredNavItem(null)}
          >
            {nav.title}
          </li>
        ))}
        <li className="relative w-10 h-10 flex items-center justify-center hover:shadow bg-accent cursor-pointers rounded-full group">
          <span
            onClick={scrollToTop}
            className={`absolute z-10 w-full h-full flex items-center justify-center group-hover:bg-primary group-hover:text-white duration-300 rounded-full ${
              isVisible ? "opacity-100 cursor-pointer" : "opacity-0"
            }`}
          >
            <ArrowUp className="w-4 h-4 cursor-pointer" />
          </span>
          <Avatar
            className={`h-full w-full rounded-full duration-300 ${
              isVisible ? "opacity-0" : "opacity-100"
            }`}
          >
            <AvatarImage
              className="object-cover"
              src={userData?.photoURL || `/assets/avatars/unknown.jpg`}
              alt="@shadcn"
            />
          </Avatar>
        </li>
      </ul>
    </nav>
  );
}

export default MinimalisticNavbar;
