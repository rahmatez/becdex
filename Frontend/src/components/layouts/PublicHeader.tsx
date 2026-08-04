"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation, useLangStore } from "@/store/lang";
import { useCmsStore } from "@/store/cms";
import { Globe, Menu } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function PublicHeader() {
  const { t, locale } = useTranslation();
  const { setLocale } = useLangStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { fetchContents } = useCmsStore();

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header id="header" className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-md py-3.5 md:py-4">
      <div className="container-custom flex items-center justify-between">
        {/* Brand (Left side) */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image src="/logo.webp" alt="BECdex Logo" width={34} height={34} className="object-contain" />
          <span className="font-extrabold text-[#012970] text-3xl tracking-tight">BECdex</span>
        </Link>

        {/* Navigation & Actions Grouped on the Right side */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7 text-base font-bold">
            <Link
              href="/"
              className={`transition-colors py-1 ${isActive("/") ? "text-[#4154f1]" : "text-[#013289] hover:text-[#4154f1]"}`}
            >
              {t.nav_home}
            </Link>
            <Link
              href="/about"
              className={`transition-colors py-1 ${isActive("/about") ? "text-[#4154f1]" : "text-[#013289] hover:text-[#4154f1]"}`}
            >
              {t.nav_about}
            </Link>
            <Link
              href="/explore"
              className={`transition-colors py-1 ${isActive("/explore") ? "text-[#4154f1]" : "text-[#013289] hover:text-[#4154f1]"}`}
            >
              {t.nav_explore}
            </Link>
            <Link
              href="/verified-companies"
              className={`transition-colors py-1 ${isActive("/verified-companies") ? "text-[#4154f1]" : "text-[#013289] hover:text-[#4154f1]"}`}
            >
              {t.nav_verified_companies}
            </Link>
            <Link
              href="/download"
              className={`transition-colors py-1 ${isActive("/download") ? "text-[#4154f1]" : "text-[#013289] hover:text-[#4154f1]"}`}
            >
              {t.nav_download}
            </Link>
          </nav>

          <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
            {/* Language Selector Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center p-1 text-[#013289] hover:text-[#4154f1] transition-colors">
                <Globe size={20} />
              </button>
              <div className="absolute right-0 top-full mt-0 hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden py-1 w-28">
                <button
                  onClick={() => setLocale("en")}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1.5 ${locale === "en" ? "font-bold text-[#4154f1]" : "text-gray-700"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale("id")}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1.5 ${locale === "id" ? "font-bold text-[#4154f1]" : "text-gray-700"}`}
                >
                  ID
                </button>
              </div>
            </div>

            {/* Login & Registration Buttons */}
            <Link
              href="/login"
              className="bg-[#4154f1] hover:bg-[#5969f3] text-white text-base font-semibold px-5 py-2.5 rounded-md transition-all shadow-xs"
            >
              {t.nav_login}
            </Link>
            <Link
              href="/register"
              className="bg-[#4154f1] hover:bg-[#5969f3] text-white text-base font-semibold px-5 py-2.5 rounded-md transition-all shadow-xs"
            >
              {t.nav_register}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Language Selection Globe for mobile */}
          <div className="relative group py-2">
            <button className="flex items-center p-1 text-[#013289] hover:text-[#4154f1] transition-colors">
              <Globe size={20} />
            </button>
            <div className="absolute right-0 top-full mt-0 hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden py-1 w-28">
              <button
                onClick={() => setLocale("en")}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1.5 ${locale === "en" ? "font-bold text-[#4154f1]" : "text-gray-700"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("id")}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1.5 ${locale === "id" ? "font-bold text-[#4154f1]" : "text-gray-700"}`}
              >
                ID
              </button>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 space-y-2 mt-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_home}</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_about}</Link>
          <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_explore}</Link>
          <Link href="/download" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_download}</Link>
          <hr className="border-gray-100" />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_login}</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">{t.nav_register}</Link>
        </div>
      )}
    </header>
  );
}
