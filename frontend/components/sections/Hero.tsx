// components/sections/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import profileImg from "@/lib/profile.png";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,245,61,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,245,61,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-acid/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cobalt/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* ── Left: Text ── */}
        <div>
          {/* <motion.p
            className="section-label mb-5"
            custom={0} variants={fadeUp} initial="hidden" animate="show"
          >
            Available for hire
          </motion.p> */}

          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-paper leading-[1.05] mb-6"
            custom={1} variants={fadeUp} initial="hidden" animate="show"
          >Devendra<br />
            <span className="italic text-acid">Panta</span>
          </motion.h1>

          <motion.p
            className="text-fog text-lg leading-relaxed mb-3 max-w-md"
            custom={2} variants={fadeUp} initial="hidden" animate="show"
          >
            <span className="text-paper font-medium">AI/ML Enthusiast | Software Engineer</span> — I build fast,
            accessible, and elegant web products from API to UI.
          </motion.p>

          <motion.p
            className="text-fog leading-relaxed mb-8 max-w-md"
            custom={3} variants={fadeUp} initial="hidden" animate="show"
          >
            Currently based in Nepal. Final year software engineering student.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 items-center mb-10"
            custom={4} variants={fadeUp} initial="hidden" animate="show"
          >
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-acid text-ink font-medium text-sm tracking-wide hover:bg-acid/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(184,245,61,0.35)]"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-full border border-slate-700 text-paper text-sm tracking-wide hover:border-slate-500 transition-all duration-200"
            >
              View my work
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-5 items-center"
            custom={5} variants={fadeUp} initial="hidden" animate="show"
          >
            <a
              href="https://github.com/hi-8055"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-fog hover:text-paper text-sm font-mono transition-colors"
            >
              <FiGithub size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/devendra-panta-9a337631a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-fog hover:text-paper text-sm font-mono transition-colors"
            >
              <FiLinkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* ── Right: Profile Image ── */}
        <motion.div
  className="flex justify-center md:justify-end"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  <div className="relative">

    {/* Glow background */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-acid/10 blur-3xl" />
    </div>

    {/* Glass ring */}
    <div className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm" />

    {/* Floating animation wrapper */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      {/* Image container */}
      <div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-full overflow-hidden">
        <Image
          src={profileImg}
          alt="Devendra Panta"
          fill
          className="object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          priority
        />
      </div>
    </motion.div>
    

    {/* Soft gradient ring (subtle, not spinning) */}
    <div className="absolute inset-0 rounded-full border border-acid/20" />

    {/* Badge (refined) */}
    <motion.div
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2 shadow-xl"
      initial={{ scale: 0, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
    >
      <p className="text-xs font-mono text-fog">Open to work</p>
      <p className="text-sm font-medium text-acid">→ Full-time roles</p>
    </motion.div>

  </div>
</motion.div>
</div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <FiArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
