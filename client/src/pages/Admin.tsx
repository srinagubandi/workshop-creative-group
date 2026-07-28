/**
 * Admin Dashboard — Workshop Creative Group
 *
 * Password-protected dashboard showing:
 * - Quote requests with invoice download links
 * - Contact form submissions
 * - Daily database backup log + manual backup trigger
 *
 * Session stored in localStorage. No Manus OAuth required.
 */

import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wscg_admin_token";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "quotes" | "contacts" | "backups";

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEY, data.token);
      onLogin(data.token);
    },
    onError: () => setError("Incorrect password. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/images/wscg-logo-white-hort.webp" alt="Workshop Creative Group" className="h-10 w-auto mx-auto mb-4" />
          <h1 className="text-white text-xl font-serif font-semibold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Workshop Creative Group</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending || !password}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-colors duration-200 disabled:opacity-50"
            style={{ background: "#1260ae" }}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new:      "bg-green-900/40 text-green-400 border-green-700",
    reviewed: "bg-blue-900/40 text-blue-400 border-blue-700",
    quoted:   "bg-yellow-900/40 text-yellow-400 border-yellow-700",
    closed:   "bg-gray-800 text-gray-400 border-gray-700",
    read:     "bg-blue-900/40 text-blue-400 border-blue-700",
    replied:  "bg-purple-900/40 text-purple-400 border-purple-700",
    success:  "bg-green-900/40 text-green-400 border-green-700",
    failed:   "bg-red-900/40 text-red-400 border-red-700",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[status] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
      {status}
    </span>
  );
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

function formatBytes(b: number | null | undefined) {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("quotes");

  const statsQ = trpc.admin.stats.useQuery({ token }, { refetchInterval: 30000 });
  const quotesQ = trpc.admin.quotes.useQuery({ token }, { enabled: tab === "quotes" });
  const contactsQ = trpc.admin.contacts.useQuery({ token }, { enabled: tab === "contacts" });
  const backupsQ = trpc.admin.backups.useQuery({ token }, { enabled: tab === "backups" });

  const updateQuote = trpc.admin.updateQuote.useMutation({ onSuccess: () => quotesQ.refetch() });
  const updateContact = trpc.admin.updateContact.useMutation({ onSuccess: () => contactsQ.refetch() });
  const runBackup = trpc.admin.runBackup.useMutation({ onSuccess: () => backupsQ.refetch() });
  const logoutMutation = trpc.admin.logout.useMutation({ onSuccess: onLogout });

  const stats = statsQ.data;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/images/wscg-logo-white-hort.webp" alt="Workshop Creative Group" className="h-8 w-auto" />
          <span className="text-gray-500 text-sm font-medium">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">
            ↗ View Site
          </a>
          <button
            onClick={() => logoutMutation.mutate({ token })}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Quotes", value: stats?.totalQuotes ?? "—", sub: `${stats?.newQuotes ?? 0} new`, color: "#7dbe31" },
            { label: "New Quotes", value: stats?.newQuotes ?? "—", sub: "awaiting review", color: "#1260ae" },
            { label: "Contact Messages", value: stats?.totalContacts ?? "—", sub: `${stats?.newContacts ?? 0} unread`, color: "#efc509" },
            { label: "Last Backup", value: stats?.lastBackup ? formatDate(stats.lastBackup).split(",")[0] : "Never", sub: stats?.lastBackup ? formatDate(stats.lastBackup).split(",")[1] : "No backups yet", color: "#7dbe31" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="text-3xl font-serif font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-white text-sm font-semibold">{s.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4">
          {(["quotes", "contacts", "backups"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                tab === t ? "text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              style={tab === t ? { background: "#1260ae" } : {}}
            >
              {t === "quotes" ? `Quote Requests (${stats?.totalQuotes ?? 0})` :
               t === "contacts" ? `Contact Messages (${stats?.totalContacts ?? 0})` :
               "Database Backups"}
            </button>
          ))}
        </div>

        {/* ── Quotes Tab ── */}
        {tab === "quotes" && (
          <div>
            {quotesQ.isLoading ? (
              <div className="text-gray-500 text-center py-12">Loading...</div>
            ) : !quotesQ.data?.length ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3">📋</div>
                <p>No quote requests yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {quotesQ.data.map((q) => (
                  <div key={q.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-semibold">{q.companyName}</span>
                          <StatusBadge status={q.status} />
                          {q.invoiceFileName && (
                            <span className="text-xs text-green-400 bg-green-900/30 border border-green-800 px-2 py-0.5 rounded-full">
                              📎 Invoice attached
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">{q.contactName} · {q.email}{q.phone ? ` · ${q.phone}` : ""}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{formatDate(q.createdAt)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuote.mutate({ token, id: q.id, status: e.target.value as any })}
                          className="bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="quoted">Quoted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                      {q.projectType && <div><span className="text-gray-500">Type:</span> <span className="text-gray-300">{q.projectType}</span></div>}
                      {q.quantity && <div><span className="text-gray-500">Qty:</span> <span className="text-gray-300">{q.quantity}</span></div>}
                      {q.sizeSpecs && <div><span className="text-gray-500">Size:</span> <span className="text-gray-300">{q.sizeSpecs}</span></div>}
                      {q.deadline && <div><span className="text-gray-500">Deadline:</span> <span className="text-gray-300">{q.deadline}</span></div>}
                    </div>

                    {q.description && (
                      <div className="text-gray-400 text-xs bg-gray-800/50 rounded-lg p-3 mb-3">
                        {q.description}
                      </div>
                    )}

                    {q.invoiceFileUrl && (
                      <a
                        href={q.invoiceFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Invoice — {q.invoiceFileName}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Contacts Tab ── */}
        {tab === "contacts" && (
          <div>
            {contactsQ.isLoading ? (
              <div className="text-gray-500 text-center py-12">Loading...</div>
            ) : !contactsQ.data?.length ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3">✉️</div>
                <p>No contact messages yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contactsQ.data.map((c) => (
                  <div key={c.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-semibold">{c.name}</span>
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="text-gray-400 text-sm">
                          <a href={`mailto:${c.email}`} className="hover:text-white transition-colors">{c.email}</a>
                          {c.phone && ` · ${c.phone}`}
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">{formatDate(c.createdAt)}</div>
                      </div>
                      <select
                        value={c.status}
                        onChange={(e) => updateContact.mutate({ token, id: c.id, status: e.target.value as any })}
                        className="bg-gray-800 border border-gray-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>
                    <div className="text-gray-300 text-sm bg-gray-800/50 rounded-lg p-3 leading-relaxed">
                      {c.message}
                    </div>
                    <div className="mt-3">
                      <a
                        href={`mailto:${c.email}?subject=Re: Your inquiry to Workshop Creative Group`}
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors duration-200"
                        style={{ background: "#1260ae" }}
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Backups Tab ── */}
        {tab === "backups" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-semibold text-lg">Database Backups</h2>
                <p className="text-gray-500 text-sm mt-1">Daily automatic backups run at 2:00 AM UTC. You can also trigger a manual backup anytime.</p>
              </div>
              <button
                onClick={() => runBackup.mutate({ token })}
                disabled={runBackup.isPending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors duration-200 disabled:opacity-50"
                style={{ background: "#7dbe31" }}
              >
                {runBackup.isPending ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Backing up...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg> Run Backup Now</>
                )}
              </button>
            </div>

            {runBackup.isSuccess && (
              <div className="mb-4 p-4 bg-green-900/30 border border-green-700 rounded-xl text-green-400 text-sm">
                ✅ Backup completed: {(runBackup.data as any)?.filename} ({formatBytes((runBackup.data as any)?.sizeBytes)})
              </div>
            )}

            {backupsQ.isLoading ? (
              <div className="text-gray-500 text-center py-12">Loading...</div>
            ) : !backupsQ.data?.length ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3">💾</div>
                <p>No backups yet. Run your first backup above.</p>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left text-gray-400 font-medium px-5 py-3">Filename</th>
                      <th className="text-left text-gray-400 font-medium px-5 py-3">Size</th>
                      <th className="text-left text-gray-400 font-medium px-5 py-3">Status</th>
                      <th className="text-left text-gray-400 font-medium px-5 py-3">Date</th>
                      <th className="text-left text-gray-400 font-medium px-5 py-3">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backupsQ.data.map((b) => (
                      <tr key={b.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="px-5 py-3 text-gray-300 font-mono text-xs">{b.filename}</td>
                        <td className="px-5 py-3 text-gray-400">{formatBytes(b.sizeBytes)}</td>
                        <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                        <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(b.createdAt)}</td>
                        <td className="px-5 py-3">
                          {b.fileUrl ? (
                            <a href={b.fileUrl} target="_blank" rel="noopener noreferrer"
                               className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                              Download
                            </a>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const meQuery = trpc.admin.me.useQuery(
    { token: token ?? undefined },
    { enabled: !!token, retry: false }
  );

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setToken(stored);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (meQuery.data === null && token) {
      // Session expired
      localStorage.removeItem(STORAGE_KEY);
      setToken(null);
    }
  }, [meQuery.data, token]);

  const handleLogin = (newToken: string) => setToken(newToken);
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  if (checking) return null;

  if (!token || meQuery.data === null) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
