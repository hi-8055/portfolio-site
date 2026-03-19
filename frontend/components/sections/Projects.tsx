// components/sections/Projects.tsx
"use client";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/api";

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="py-28 relative">
      <div className="hr-fade mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Selected Work</p>
            <h2 className="font-display text-4xl sm:text-5xl text-paper">
              Recent <span className="italic text-acid">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-mono tracking-wide text-acid border-b border-acid/30 pb-0.5 hover:border-acid transition-colors"
          >
            View all projects →
          </Link>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="reveal py-20 text-center text-fog font-mono text-sm">
            No projects loaded — make sure the API server is running.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
