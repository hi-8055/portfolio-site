// components/admin/ProjectsTable.tsx
"use client";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import type { Project } from "@/lib/api";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-fog font-mono text-sm text-center py-16">No projects in the database.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/80">
            <th className="text-left px-5 py-3 font-mono text-xs tracking-widest uppercase text-fog">Title</th>
            <th className="text-left px-5 py-3 font-mono text-xs tracking-widest uppercase text-fog hidden md:table-cell">Stack</th>
            <th className="text-center px-5 py-3 font-mono text-xs tracking-widest uppercase text-fog">Featured</th>
            <th className="text-center px-5 py-3 font-mono text-xs tracking-widest uppercase text-fog">Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr
              key={p.id}
              className={`border-b border-slate-800/50 hover:bg-slate-900/40 transition-colors ${
                i === projects.length - 1 ? "border-b-0" : ""
              }`}
            >
              {/* Title */}
              <td className="px-5 py-4">
                <p className="text-paper font-medium">{p.title}</p>
                <p className="text-fog text-xs mt-0.5 line-clamp-1 max-w-xs">{p.description}</p>
              </td>

              {/* Stack */}
              <td className="px-5 py-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {(p.tech_stack ?? []).slice(0, 4).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {(p.tech_stack ?? []).length > 4 && (
                    <span className="tag">+{p.tech_stack.length - 4}</span>
                  )}
                </div>
              </td>

              {/* Featured */}
              <td className="px-5 py-4 text-center">
                {p.featured ? (
                  <span className="inline-flex items-center gap-1 text-acid text-xs font-mono">
                    <FiStar size={12} className="fill-acid" /> Yes
                  </span>
                ) : (
                  <span className="text-fog text-xs font-mono">—</span>
                )}
              </td>

              {/* Links */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-3">
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer"
                       className="text-fog hover:text-paper transition-colors" title="GitHub">
                      <FiGithub size={16} />
                    </a>
                  )}
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer"
                       className="text-fog hover:text-acid transition-colors" title="Live">
                      <FiExternalLink size={16} />
                    </a>
                  )}
                  {!p.github_url && !p.live_url && (
                    <span className="text-fog text-xs font-mono">—</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
