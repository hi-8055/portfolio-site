// components/ui/ProjectCard.tsx
import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/lib/api";

interface Props {
  project: Project;
  detailed?: boolean;   // show full description on /projects page
}

export default function ProjectCard({ project, detailed = false }: Props) {
  return (
    <article className="card-border bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 hover:bg-slate-900 transition-all duration-300 group">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl text-paper group-hover:text-acid transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Links */}
        <div className="flex gap-3 shrink-0 mt-0.5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-paper transition-colors"
              aria-label={`GitHub for ${project.title}`}
            >
              <FiGithub size={17} />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-acid transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className={`text-fog text-sm leading-relaxed ${detailed ? "" : "line-clamp-3"}`}>
        {project.description}
      </p>

      {/* Tech stack */}
      {project.tech_stack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-slate-800">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      )}
    </article>
  );
}
