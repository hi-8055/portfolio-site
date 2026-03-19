// app/api/contact/route.ts
// This route is optional — the frontend can also POST directly to the Express backend.
// It exists as a proxy layer, useful when you want to add server-side logic or keep
// the backend URL out of client bundles.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const upstream = await fetch(`${apiUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
