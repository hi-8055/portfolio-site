// app/admin/dashboard/page.tsx — Protected admin dashboard
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchMessages, fetchAllProjects } from "@/lib/adminApi";
import MessagesTable from "@/components/admin/MessagesTable";
import ProjectsTable from "@/components/admin/ProjectsTable";
import AddProjectForm from "@/components/admin/AddProjectForm";
import Link from "next/link";
import {
  FiMail, FiFolder, FiLogOut, FiRefreshCw,
  FiHome, FiAlertTriangle,
} from "react-icons/fi";

type Tab = "messages" | "projects";

export default function AdminDashboard() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab]     = useState<Tab>("messages");
  const [messages, setMessages]       = useState<any[]>([]);
  const [projects, setProjects]       = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  // On mount — read credentials from sessionStorage
  useEffect(() => {
    const u = sessionStorage.getItem("admin_user");
    const p = sessionStorage.getItem("admin_pass");
    if (!u || !p) {
      router.replace("/admin");
      return;
    }
    setCredentials({ username: u, password: p });
  }, [router]);

  // Load data when credentials are ready
  const loadData = useCallback(async () => {
    if (!credentials.username) return;
    setLoading(true);
    setError("");
    try {
      const [msgs, projs] = await Promise.all([
        fetchMessages(credentials.username, credentials.password),
        fetchAllProjects(),
      ]);
      setMessages(msgs);
      setProjects(projs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  useEffect(() => { loadData(); }, [loadData]);

  function handleLogout() {
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_pass");
    router.push("/admin");
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── Topbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-paper">
              AR<span className="text-acid">.</span>
            </span>
            <span className="text-slate-600 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-fog tracking-widest uppercase">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-fog hover:text-paper text-sm font-mono transition-colors"
            >
              <FiHome size={14} /> Site
            </Link>
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 text-fog hover:text-paper text-sm font-mono transition-colors"
            >
              <FiRefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-fog hover:text-red-400 text-sm font-mono transition-colors"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Messages",  value: messages.length, icon: <FiMail size={18} />,   color: "text-cobalt" },
            { label: "Total Projects",  value: projects.length, icon: <FiFolder size={18} />, color: "text-acid"   },
            { label: "Featured",
              value: projects.filter((p: any) => p.featured).length,
              icon: "⭐", color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-900/60 border border-slate-800 rounded-xl px-5 py-4">
              <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
              <p className="font-display text-3xl text-paper">
                {loading ? <span className="animate-pulse text-fog">—</span> : stat.value}
              </p>
              <p className="text-fog text-xs font-mono mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Error banner ──────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm font-mono mb-8">
            <FiAlertTriangle size={16} /> {error}
          </div>
        )}

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 bg-slate-900/60 border border-slate-800 rounded-xl p-1 w-fit">
          {(["messages", "projects"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono tracking-wide capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-acid text-ink font-medium"
                  : "text-fog hover:text-paper"
              }`}
            >
              {tab === "messages" ? <FiMail size={14} /> : <FiFolder size={14} />}
              {tab}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab ? "bg-ink/20" : "bg-slate-800"
              }`}>
                {tab === "messages" ? messages.length : projects.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Tab content ───────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-700 border-t-acid rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === "messages" && (
              <section>
                <h2 className="font-display text-2xl text-paper mb-6">
                  Contact <span className="italic text-acid">Messages</span>
                </h2>
                <MessagesTable messages={messages} />
              </section>
            )}

            {activeTab === "projects" && (
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="font-display text-2xl text-paper">
                    All <span className="italic text-acid">Projects</span>
                  </h2>
                  <AddProjectForm
                    credentials={credentials}
                    onAdded={loadData}
                  />
                </div>
                <ProjectsTable projects={projects} />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
