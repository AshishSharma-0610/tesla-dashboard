"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart, Zap, Users, Activity, HelpCircle, Settings, Menu, X } from 'lucide-react';

const navigation = [
  { name: "Reports", href: "/dashboard", icon: BarChart },
  { name: "Library", href: "/dashboard/library", icon: Zap },
  { name: "People", href: "/dashboard/people", icon: Users },
  { name: "Activities", href: "/dashboard/activities", icon: Activity },
];

const support = [
  { name: "Get Started", href: "/dashboard/get-started", icon: HelpCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <div className={cn(
        "fixed inset-y-0 left-0 z-10 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full border-r">
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-red-500">TESLA</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-8 p-4 overflow-y-auto">
            <div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-lg mb-1",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2 px-4">
                Support
              </div>
              {support.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-lg mb-1",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

