"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#about" },
  { label: "Founder", href: "#founder" },
  { label: "Projects", href: "#projects" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#070a0f]/92 backdrop-blur-2xl border-b border-[rgba(0,212,255,0.12)] py-3.5"
          : "py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          {/* Icon */}
          <Image
            src="/Nodal logo final-03.png"
            alt="Nodal Technical Consultancy"
            height={38}
            width={38}
            className="object-contain"
            priority
          />
          {/* Divider */}
          <span
            className="hidden sm:block w-px self-stretch"
            style={{ background: "rgba(0,212,255,0.25)" }}
          />
          {/* Wordmark */}
          <span className="hidden sm:flex flex-col justify-center leading-none">
            <span
              className="font-[var(--font-display)] font-bold tracking-[0.18em] uppercase text-[#e8f0fe]"
              style={{ fontSize: "0.85rem" }}
            >
              Nodal
            </span>
            <span
              className="font-[var(--font-mono)] uppercase tracking-[0.22em] text-[#00d4ff]"
              style={{ fontSize: "0.42rem", opacity: 0.75, marginTop: "2px" }}
            >
              Technical Consultancy
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[var(--font-display)] text-sm font-semibold tracking-wider uppercase text-[#8892a4] hover:text-[#00d4ff] transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="font-[var(--font-mono)] text-xs px-4 py-2 border border-[#00d4ff] text-[#00d4ff] rounded-[4px] hover:bg-[#00d4ff] hover:text-black transition-all duration-300"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#e8f0fe] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#e8f0fe] transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#e8f0fe] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#070a0f]/98 border-b border-[rgba(0,212,255,0.12)] p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[var(--font-display)] text-sm font-semibold tracking-wider uppercase text-[#8892a4] hover:text-[#00d4ff] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-[var(--font-mono)] text-xs px-4 py-2 border border-[#00d4ff] text-[#00d4ff] rounded-[4px] hover:bg-[#00d4ff] hover:text-black transition-all duration-300 text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
