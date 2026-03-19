// lib/api.ts — Typed fetch helpers for all backend endpoints

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  featured?: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: { field: string; message: string }[];
}

/** Fetch all projects */
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  const json: ApiResponse<Project[]> = await res.json();
  return json.data ?? [];
}

/** Fetch featured projects for homepage preview */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects/featured`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch featured projects");
  const json: ApiResponse<Project[]> = await res.json();
  return json.data ?? [];
}

/** Submit contact form — client-side only, no caching */
export async function submitContact(
  payload: ContactPayload
): Promise<{ success: boolean; message?: string; errors?: { field: string; message: string }[] }> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    return { success: false, errors: json.errors, message: json.error };
  }
  return { success: true, message: json.message };
}
