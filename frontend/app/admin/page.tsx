// app/admin/page.tsx — Admin login page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdmin } from "@/lib/adminApi";
import { FiLock, FiUser, FiAlertCircle } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const ok = await verifyAdmin(username, password);
      if (ok) {
        // Store credentials in sessionStorage (cleared when tab closes)
        sessionStorage.setItem("admin_user", username);
        sessionStorage.setItem("admin_pass", password);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Could not reach the API server. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,245,61,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,245,61,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 mb-5">
            <FiLock size={22} className="text-acid" />
          </div>
          <h1 className="font-display text-3xl text-paper mb-2">
            Admin <span className="italic text-acid">Panel</span>
          </h1>
          <p className="text-fog text-sm font-mono">Enter your credentials to continue</p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleLogin}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-5 backdrop-blur"
        >
          {/* Username */}
          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-2">
              Username
            </label>
            <div className="relative">
              <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-fog mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm font-mono">
              <FiAlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-acid text-ink font-medium text-sm tracking-wide hover:bg-acid/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(184,245,61,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> Verifying…</>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-fog text-xs font-mono">
          Credentials are set in{" "}
          <span className="text-paper">server/.env</span>
        </p>
      </div>
    </div>
  );
}
