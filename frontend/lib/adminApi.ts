// lib/adminApi.ts — Typed fetch helpers for all admin API endpoints

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** Encode credentials to Basic Auth header */
export function makeAuthHeader(username: string, password: string) {
  const encoded = btoa(`${username}:${password}`);
  return { Authorization: `Basic ${encoded}` };
}

/** Verify credentials by hitting GET /api/admin */
export async function verifyAdmin(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin`, {
    headers: { ...makeAuthHeader(username, password) },
  });
  return res.ok;
}

/** Fetch all contact messages */
export async function fetchMessages(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/messages`, {
    headers: { ...makeAuthHeader(username, password) },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  const json = await res.json();
  return json.data ?? [];
}

/** Fetch all projects (reuse public endpoint) */
export async function fetchAllProjects() {
  const res = await fetch(`${API_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const json = await res.json();
  return json.data ?? [];
}

/** Add a new project */
export async function addProject(
  payload: {
    title: string;
    description: string;
    tech_stack: string[];
    github_url?: string;
    live_url?: string;
    featured: boolean;
  },
  username: string,
  password: string
) {
  const res = await fetch(`${API_URL}/api/admin/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...makeAuthHeader(username, password),
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to add project");
  return json.data;
}
