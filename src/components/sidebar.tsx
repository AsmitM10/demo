"use client";

import { Home, Users, HelpCircle, LogOut, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { name: "Home", href: "/user", icon: Home },
  { name: "Referrals", href: "/referrals", icon: Users },
  { name: "FAQs", href: "/faqs", icon: HelpCircle },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export function Sidebar({ userName }: { userName?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-3 fixed top-4 left-4 z-50 bg-emerald-600 text-white rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)} // close when clicking outside
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-white shadow-md flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header with Close button (only mobile) */}
        <div className="flex items-center justify-between px-4 py-6 border-b">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6" />
            <span className="font-medium">{userName || "Guest User"}</span>
          </div>
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-black hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)} // auto close on mobile
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
