"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes, display, person } from "@/config";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { GlobalFontSwitcher } from "@/components/common/GlobalFontSwitcher";
import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
} from "react-icons/pi";
import { HiOutlineRocketLaunch, HiOutlineBriefcase, HiEnvelope } from "react-icons/hi2";
import { MdArticle } from "react-icons/md";

const navItems = [
  { path: "/", label: "Home", icon: PiHouseDuotone, route: "/" },
  { path: "/about", label: "About", icon: PiUserCircleDuotone, route: "/about" },
  { path: "/skills", label: "Skills", icon: HiOutlineRocketLaunch, route: "/skills" },
  { path: "/experience", label: "Experience", icon: HiOutlineBriefcase, route: "/experience" },
  { path: "/work", label: "Work", icon: PiGridFourDuotone, route: "/work" },
  { path: "/blog", label: "Blog", icon: MdArticle, route: "/blog" },
  { path: "/contact", label: "Contact", icon: HiEnvelope, route: "/contact" },
];

const TimeDisplay = ({ timeZone }: { timeZone: string }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">
      {currentTime}
    </span>
  );
};

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      {/* Desktop header */}
      <header className="sticky top-0 z-50 w-full hidden md:flex">
        <div className="w-full flex items-center justify-between px-6 py-3">
          <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
            {display.location && <span>{person.location}</span>}
          </div>
          <nav className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-full px-1.5 py-1.5 shadow-lg">
            {navItems.map((item) => {
              if (!routes[item.route]) return null;
              const isActive =
                item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#ff4081] text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-[#ff4081] dark:hover:text-[#ff4081] hover:bg-pink-50 dark:hover:bg-pink-950/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {display.themeSwitcher && (
              <>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
                <GlobalFontSwitcher />
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
                <ThemeToggle />
              </>
            )}
          </nav>
          <div className="flex-1 flex justify-end text-sm">
            {display.time && <TimeDisplay timeZone={person.timeZone} />}
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-full px-2 py-2 shadow-lg">
        {navItems.map((item) => {
          if (!routes[item.route]) return null;
          const isActive =
            item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`p-2.5 rounded-full transition-colors ${
                isActive
                  ? "bg-[#ff4081] text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#ff4081]"
              }`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
        {display.themeSwitcher && (
          <>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-0.5" />
            <GlobalFontSwitcher />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-0.5" />
            <ThemeToggle />
          </>
        )}
      </nav>
    </>
  );
};
