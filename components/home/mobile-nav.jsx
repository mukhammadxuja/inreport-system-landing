import { X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const MobileNav = ({ openMobileNav, setOpenMobileNav }) => {
  return (
    <div
      className={`fixed top-0 right-0 z-[1000] w-full md:w-96 bg-primary shadow-md h-screen px-5 py-4 duration-300 ${
        openMobileNav ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Image
          width={40}
          height={40}
          src="/logo-white.svg"
          alt="Logo"
          className="w-7 h-7 lg:h-5 lg:w-5 transition-all group-hover:scale-110 opacity-90"
        />
        <div className="flex items-center gap-2">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://app.inreport.uz/"
          >
            <Button className="bg-white hover:bg-gray-100 text-black hover:text-black">
              Hisobga kirish
            </Button>
          </Link>
          <Button
            onClick={() => setOpenMobileNav(false)}
            className="bg-transparent text-white px-4"
            variant="outline"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-3 py-10">
        <ul className="flex flex-col -space-y-2.5">
          <li className="mb-2 uppercase text-secondary opacity-75 text-xs font-semibold">
            <span>Inreport</span>
          </li>
          <li className="nav-link text-white">
            <Link href="/prices" onClick={() => setOpenMobileNav(false)}>Narxlar</Link>
          </li>
          <li className="nav-link text-white">
            <Link href="/#services" onClick={() => setOpenMobileNav(false)}>Xizmatlar</Link>
          </li>
          <li className="nav-link text-white">
            <Link href="/aboutus" onClick={() => setOpenMobileNav(false)}>Haqimizda</Link>
          </li>
          <li className="nav-link text-white">
            <Link href="/contact" onClick={() => setOpenMobileNav(false)}>Aloqa</Link>
          </li>
        </ul>
        <ul className="flex flex-col -space-y-2.5">
          <li className="mb-2 uppercase text-secondary opacity-75 text-xs font-semibold mt-2">
            <span>Follow Us</span>
          </li>
          <li className="nav-link text-white">
            <a href="tel:+998995575230">99 557-52-30</a>
          </li>
          <li className="nav-link text-white">
            <a target="_blank" rel="noopener noreferrer" href="tel:+998919449491">
              91 944-94-91
            </a>
          </li>
          <li className="nav-link text-white">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/inreport.uz/"
            >
              Instagram
            </a>
          </li>
          {/* <li className="nav-link text-white">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/dot-soft-330800254/"
            >
              LInkedin
            </a>
          </li> */}
          <li className="nav-link text-white">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/inreport"
            >
              Telegram
            </a>
          </li>
          {/* <li className="nav-link text-white">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/DotSoftUz"
            >
              Twitter
            </a>
          </li> */}
          <li className="nav-link text-white">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/dotsoftuz/"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
