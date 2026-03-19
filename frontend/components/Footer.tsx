// components/Footer.tsx
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-fog">
          © {year} <span className="text-paper">Devendra Panta</span>. Built with Next.js &amp; ☕
        </p>

        <div className="flex gap-5 items-center">
          {[
            { href: "https://github.com/hi-8055",   icon: <FiGithub size={17} />,   label: "GitHub" },
            { href: "https://www.linkedin.com/in/devendra-panta-9a337631a/",       icon: <FiLinkedin size={17} />, label: "LinkedIn" },
            { href: "https://x.com/pantadevendra16",  icon: <FiTwitter size={17} />,  label: "Twitter" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-paper transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
