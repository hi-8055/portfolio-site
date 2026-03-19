// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl text-paper hover:text-acid transition-colors">
          Dev<span className="text-acid">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-mono tracking-wide text-fog hover:text-paper transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/projects"
              className="px-4 py-1.5 rounded-full border border-acid/40 text-acid text-sm font-mono tracking-wide hover:bg-acid hover:text-ink transition-all duration-200"
            >
              All Projects
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-fog hover:text-paper transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-transform" style={{ transform: open ? "rotate(45deg) translate(2px, 8px)" : "none" }} />
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-opacity" style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-current transition-transform" style={{ transform: open ? "rotate(-45deg) translate(2px, -8px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-mono tracking-wide text-fog hover:text-paper transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="text-acid text-sm font-mono tracking-wide"
          >
            All Projects →
          </Link>
        </div>
      )}
    </header>
  );
}
