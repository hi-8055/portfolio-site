// components/sections/Contact.tsx
"use client";
import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { submitContact } from "@/lib/api";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useScrollReveal();

  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    setFieldErrors({});

    const result = await submitContact(form);

    if (result.success) {
      setStatus("success");
      setFeedback(result.message || "Message sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
      if (result.errors) {
        const map: Record<string, string> = {};
        result.errors.forEach((e) => { map[e.field] = e.message; });
        setFieldErrors(map);
        setFeedback("Please fix the errors below.");
      } else {
        setFeedback(result.message || "Something went wrong. Please try again.");
      }
    }
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="hr-fade mb-20" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="reveal">
            <p className="section-label mb-3">Let's Talk</p>
            <h2 className="font-display text-4xl sm:text-5xl text-paper mb-6">
              Start a <span className="italic text-acid">Conversation</span>
            </h2>
            <p className="text-fog leading-relaxed mb-8 max-w-sm">
              Whether you have a project idea, a job opportunity, or just want to say hello —
              I'd love to hear from you. I typically reply within 24 hours.
            </p>

            <ul className="space-y-3 font-mono text-sm">
              {[
                { label: "Email", value: "pantadevendra16@gmail.com" },
                { label: "Location", value: "Kathmandy, Nepal" },
                { label: "Availability", value: "Open to full-time roles" },
              ].map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="text-fog w-24">{item.label}</span>
                  <span className="text-paper">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="reveal">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono tracking-widest uppercase text-fog mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                  className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors ${
                    fieldErrors.name ? "border-red-500/60" : "border-slate-700"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono tracking-widest uppercase text-fog mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                  className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors ${
                    fieldErrors.email ? "border-red-500/60" : "border-slate-700"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{fieldErrors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono tracking-widest uppercase text-fog mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-paper text-sm placeholder:text-slate-600 focus:outline-none focus:border-acid/50 transition-colors resize-none ${
                    fieldErrors.message ? "border-red-500/60" : "border-slate-700"
                  }`}
                />
                {fieldErrors.message && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{fieldErrors.message}</p>
                )}
              </div>

              {/* Feedback banner */}
              {status !== "idle" && feedback && (
                <div
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-mono ${
                    status === "success"
                      ? "bg-acid/10 border border-acid/30 text-acid"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  {status === "success" ? <FiCheckCircle size={15} /> : <FiAlertCircle size={15} />}
                  {feedback}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-acid text-ink font-medium text-sm tracking-wide hover:bg-acid/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(184,245,61,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Sending…
                  </>
                ) : status === "success" ? (
                  <><FiCheckCircle size={16} /> Message Sent!</>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
