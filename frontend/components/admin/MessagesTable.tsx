// components/admin/MessagesTable.tsx
"use client";
import { FiMail, FiClock, FiInbox } from "react-icons/fi";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function MessagesTable({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-fog">
        <FiInbox size={36} className="mb-3 opacity-40" />
        <p className="font-mono text-sm">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-acid font-display text-sm shrink-0">
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-paper font-medium text-sm">{msg.name}</p>
                <a
                  href={`mailto:${msg.email}`}
                  className="flex items-center gap-1 text-fog text-xs font-mono hover:text-acid transition-colors"
                >
                  <FiMail size={11} />
                  {msg.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1 text-fog text-xs font-mono">
              <FiClock size={11} />
              {new Date(msg.created_at).toLocaleString()}
            </div>
          </div>

          <p className="text-fog text-sm leading-relaxed border-t border-slate-800 pt-3 whitespace-pre-wrap">
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
}
