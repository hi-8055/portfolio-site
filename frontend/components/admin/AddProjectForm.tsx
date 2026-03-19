// components/admin/AddProjectForm.tsx
"use client";
import { useState } from "react";
import { addProject } from "@/lib/adminApi";
import { FiPlus, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

interface Props {
  credentials: { username: string; password: string };
  onAdded: () => void; // callback to refresh list
}

export default function AddProjectForm({ credentials, onAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    techInput: "",   // comma-separated raw input
    github_url: "",
    live_url: "",
    featured: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const tech_stack = form.techInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await addProject(
        {
          title: form.title,
          description: form.description,
          tech_stack,
          github_url: form.github_url || undefined,
          live_url: form.live_url || undefined,
          featured: form.featured,
        },
        credentials.username,
        credentials.password
      );

      setStatus("success");
      setFeedback("Project added successfully!");
      setForm({ title: "", description: "", techInput: "", github_url: "", live_url: "", featured: false });
      onAdded(); // refresh project list in parent
      setTimeout(() => { setOpen(false); setStatus("idle"); setFeedback(""); }, 1500);
    } catch (err: unknown) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Failed to add project.");
    }
  }

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-acid text-ink font-medium text-sm tracking-wide hover:bg-acid/90 transition-all duration-200"
      >
        {open ? <FiX size={15} /> : <FiPlus size={15} />}
        {open ? "Cancel" : "Add Project"}
      </button>

      {/* Form panel */}
      {open && (
        <div className="mt-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-paper font-medium mb-1">New Project</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-1.5">
                Title *
              </label>
              <input
                name="title" value={form.title} onChange={handleChange}
                required placeholder="My Awesome Project"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-1.5">
                Description *
              </label>
              <textarea
                name="description" value={form.description} onChange={handleChange}
                required rows={3} placeholder="What the project does and why it matters…"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors resize-none"
              />
            </div>

            {/* Tech stack */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-1.5">
                Tech Stack (comma-separated)
              </label>
              <input
                name="techInput" value={form.techInput} onChange={handleChange}
                placeholder="React, Node.js, PostgreSQL, Docker"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
              />
              {/* Preview tags */}
              {form.techInput && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.techInput.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* URLs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-1.5">
                  GitHub URL
                </label>
                <input
                  name="github_url" value={form.github_url} onChange={handleChange}
                  type="url" placeholder="https://github.com/you/repo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-1.5">
                  Live URL
                </label>
                <input
                  name="live_url" value={form.live_url} onChange={handleChange}
                  type="url" placeholder="https://project.vercel.app"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
                />
              </div>
            </div>

            {/* Featured toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox" name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 rounded-full peer-checked:bg-acid transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-fog group-hover:text-paper transition-colors">
                Show on homepage (featured)
              </span>
            </label>

            {/* Feedback */}
            {status !== "idle" && feedback && (
              <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-mono ${
                status === "success"
                  ? "bg-acid/10 border border-acid/30 text-acid"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}>
                {status === "success" ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                {feedback}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={status === "loading" || status === "success"}
              className="w-full py-3 rounded-full bg-acid text-ink font-medium text-sm tracking-wide hover:bg-acid/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <><span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />Saving…</>
              ) : status === "success" ? (
                <><FiCheckCircle size={15} /> Saved!</>
              ) : (
                <><FiPlus size={15} /> Add Project</>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
