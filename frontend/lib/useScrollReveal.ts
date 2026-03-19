// lib/useScrollReveal.ts — Intersection Observer hook for scroll animations
"use client";
import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold }
    );

    // Observe the container and all children with class "reveal"
    const targets = el.querySelectorAll(".reveal");
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t));
    } else {
      el.classList.add("reveal");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
