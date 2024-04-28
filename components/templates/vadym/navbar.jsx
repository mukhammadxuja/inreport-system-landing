import { useMainContext } from "@/context/main-context";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function VadymNavbar() {
  const pathname = usePathname();

  const navData = [
    {
      id: 1,
      title: "Projects",
      path: "/project/intoday",
    },
    {
      id: 2,
      title: "About",
      path: "/about",
    },
    // {
    //   id: 3,
    //   title: "Music",
    //   path: "/musics",
    // },
    {
      id: 4,
      title: "CV",
      path: "/cv",
    },
    {
      id: 6,
      title: "Blog",
      path: "/blog",
    },
    // {
    //   id: 7,
    //   title: "Lab",
    //   path: "/lab",
    // },
    {
      id: 5,
      title: "Contact",
      path: "/contact",
    },
  ];

  return (
    <nav className="nav w-full px-4 md:px-0 left-1/2 -translate-x-1/2 py-2 md:py-4 fixed top-0 z-50 bg-white backdrop-blur-sm bg-opacity-50">
      <div className="mx-auto max-w-[896px] flex items-center justify-between">
        <div className="space-y-4 md:space-y-6">
          <Image
            title="Home"
            width={60}
            height={60}
            className="w-6 cursor-pointer hover:opacity-80 duration-500"
            src="/logo.svg"
            alt="Vadym Template"
          />
        </div>
        <ul className="flex items-center space-x-2 md:space-x-3">
          {navData.map((nav) => (
            <li
              key={nav.id}
              className={`vadym_link ${pathname === nav.path && "active"}`}
            >
              <a id={nav.path}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default VadymNavbar;
