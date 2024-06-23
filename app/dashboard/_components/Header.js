"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
// Importing the hamburger menu icon from Lucide

function Header() {
  const path = usePathname();
  const [scrollBackground, setScrollBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrollBackground) {
        setScrollBackground(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollBackground]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`flex p-4 items-center justify-between shadow-sm backdrop-filter backdrop-blur-md fixed top-0 w-full z-50 ${
        scrollBackground
          ? "bg-secondary bg-opacity-90"
          : "bg-transparent"
      }`}
    >
      <Link href={"/"}>
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      </Link>

      {/* Hamburger menu icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      <ul className="hidden md:flex gap-6">
        <NavLink path={path} href={"/dashboard"}>Dashboard</NavLink>
        <NavLink path={path} href={"/questions"}>Questions</NavLink>
        <NavLink path={path} href={"/pricing"}>Pricing</NavLink>
        <NavLink path={path} href={"/how"}>How it works?</NavLink>
      </ul>

      <div className="md:hidden">
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-md rounded-md mt-2 py-2 w-40">
            <NavLink path={path} href={"/dashboard"}>Dashboard</NavLink>
            <NavLink path={path} href={"/questions"}>Questions</NavLink>
            <NavLink path={path} href={"/pricing"}>Pricing</NavLink>
            <NavLink path={path} href={"/how"}>How it works?</NavLink>
          </div>
        )}
      </div>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

// Component for navigation links
function NavLink({ path, href, children }) {
  return (
    <Link href={href}>
      <li className={`hover:text-white hover:font-bold transition-all cursor-pointer block px-4 py-2 rounded-md hover:bg-primary ${
        path === href ? "text-primary font-bold" : "text-black hover:bg-blue-600"
      }`}>
        {children}
      </li>
    </Link>
  );
}

export default Header;