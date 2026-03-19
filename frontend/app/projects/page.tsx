// app/projects/page.tsx — Full projects listing page
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import { fetchProjects, type Project } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects — Alex Rivera",
  description: "All projects built by Alex Rivera — full-stack web engineer.",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let error = false;

  try {
    projects = await fetchProjects();
  } catch {
    error = true;
    console.warn("Could not fetch projects from API");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fog hover:text-paper text-sm font-mono tracking-wide transition-colors mb-8"
            >
              ← Back home
            </Link>

            <p className="section-label mb-3">Portfolio</p>
            <h1 className="font-display text-5xl sm:text-6xl text-paper">
              All <span className="italic text-acid">Projects</span>
            </h1>
            <p className="text-fog mt-4 max-w-lg">
              A full catalogue of the things I've built — side projects, client work,
              and open-source contributions.
            </p>
          </div>

          {/* Error state */}
          {error && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm font-mono">
              ⚠️ Could not connect to the API server. Make sure the backend is running on{" "}
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}.
            </div>
          )}

          {/* Projects grid */}
          {projects.length === 0 && !error ? (
            <p className="text-fog font-mono text-sm py-20 text-center">No projects found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} detailed />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}