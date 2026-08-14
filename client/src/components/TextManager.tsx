import { useMemo, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { scanEditableText, type EditableTextField } from "@/lib/textOverrides";

const ROUTES = [
  ["/", "Home"], ["/about", "About"], ["/large-format-printing", "Large Format Printing"], ["/graphic-design", "Graphic Design"],
  ["/print-procurement", "Print Procurement"], ["/gallery", "Our Work"], ["/request-quote", "Request a Quote"], ["/contact", "Contact"], ["/blog", "Brent’s Blog"],
] as const;

export function TextManager({ token }: { token: string }) {
  const [routePath, setRoutePath] = useState("/");
  const [fields, setFields] = useState<EditableTextField[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overridesQ = trpc.admin.textOverrides.useQuery({ token, routePath });
  const utils = trpc.useUtils();
  const save = trpc.admin.saveTextOverride.useMutation({ onSuccess: () => utils.admin.textOverrides.invalidate({ token, routePath }) });
  const reset = trpc.admin.resetTextOverride.useMutation({ onSuccess: () => utils.admin.textOverrides.invalidate({ token, routePath }) });
  const overrides = useMemo(() => new Map((overridesQ.data || []).map((item) => [item.fieldKey, item.value])), [overridesQ.data]);
  const [bulkWorking, setBulkWorking] = useState(false);
  const [verification, setVerification] = useState<{ active: boolean; completed: number; total: number; error?: string }>({ active: false, completed: 0, total: 0 });

  const inspect = (attempt = 0) => {
    const document = iframeRef.current?.contentDocument;
    if (!document) return;
    const next = scanEditableText(document);
    if (next.length <= 1 && attempt < 5) {
      window.setTimeout(() => inspect(attempt + 1), 300);
      return;
    }
    setFields(next);
    setDrafts(Object.fromEntries(next.map((field) => [field.fieldKey, overrides.get(field.fieldKey) ?? field.value])));
  };

  const changeRoute = (nextPath: string) => { setRoutePath(nextPath); setFields([]); setDrafts({}); setVerification({ active: false, completed: 0, total: 0 }); };
  const refreshPreview = () => {
    iframeRef.current?.contentWindow?.location.reload();
    window.setTimeout(inspect, 500);
  };
  const dirtyFields = fields.filter((field) => (drafts[field.fieldKey] ?? field.value) !== field.value);
  const saveAll = async () => {
    if (!dirtyFields.length) return;
    setBulkWorking(true);
    try {
      for (const field of dirtyFields) await save.mutateAsync({ token, routePath, fieldKey: field.fieldKey, value: drafts[field.fieldKey] ?? field.value });
      await utils.admin.textOverrides.invalidate({ token, routePath });
      refreshPreview();
    } finally { setBulkWorking(false); }
  };
  const resetAll = async () => {
    const saved = fields.filter((field) => overrides.has(field.fieldKey));
    if (!saved.length) return;
    setBulkWorking(true);
    try {
      for (const field of saved) await reset.mutateAsync({ token, routePath, fieldKey: field.fieldKey });
      setDrafts((current) => ({ ...current, ...Object.fromEntries(saved.map((field) => [field.fieldKey, field.value])) }));
      await utils.admin.textOverrides.invalidate({ token, routePath });
      refreshPreview();
    } finally { setBulkWorking(false); }
  };
  const verifyPageFields = async () => {
    if (!fields.length) return;
    setVerification({ active: true, completed: 0, total: fields.length });
    try {
      for (let index = 0; index < fields.length; index += 1) {
        const field = fields[index];
        const original = field.value;
        await save.mutateAsync({ token, routePath, fieldKey: field.fieldKey, value: original });
        await reset.mutateAsync({ token, routePath, fieldKey: field.fieldKey });
        setVerification({ active: true, completed: index + 1, total: fields.length });
      }
      await utils.admin.textOverrides.invalidate({ token, routePath });
      refreshPreview();
      setVerification({ active: false, completed: fields.length, total: fields.length });
    } catch (error) {
      setVerification((current) => ({ ...current, active: false, error: error instanceof Error ? error.message : "Verification failed" }));
    }
  };
  return <div className="space-y-5">
    <div className="bg-blue-950/35 border border-blue-800 rounded-xl p-4 text-sm text-blue-100">
      <strong>Complete Text Manager.</strong> This tool discovers every visible text node and supported accessible attribute on the selected public page. Edit individual fields, save, then use the preview to confirm the existing page layout remains intact. Use reset to restore the approved source copy.
    </div>
    <div className="flex flex-wrap gap-2">
      {ROUTES.map(([path, label]) => <button key={path} onClick={() => changeRoute(path)} className={`px-3 py-2 rounded-lg text-sm font-semibold ${routePath === path ? "bg-[#1260ae] text-white" : "bg-gray-800 text-gray-300 hover:text-white"}`}>{label}</button>)}
    </div>
    <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-5">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 min-h-[500px]">
        <iframe ref={iframeRef} key={routePath} src={routePath} title="Public-page text preview" onLoad={() => window.setTimeout(() => inspect(), 350)} className="w-full h-[680px] border-0 bg-white" />
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 max-h-[680px] overflow-y-auto space-y-3">
        <div className="sticky top-0 bg-gray-900 pb-3 z-10 space-y-2"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Editable fields</h3><p className="text-xs text-gray-500">{fields.length} fields detected on this page</p></div><button onClick={() => inspect()} className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-800 text-gray-200">Refresh fields</button></div><div className="flex flex-wrap gap-2"><button onClick={saveAll} disabled={!dirtyFields.length || bulkWorking || verification.active} className="text-xs font-semibold px-3 py-2 rounded-lg bg-[#1260ae] disabled:opacity-50">Save {dirtyFields.length ? `${dirtyFields.length} changed field${dirtyFields.length === 1 ? "" : "s"}` : "changes"}</button><button onClick={resetAll} disabled={!overrides.size || bulkWorking || verification.active} className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-800 text-gray-200 disabled:opacity-50">Reset all saved overrides</button><button onClick={verifyPageFields} disabled={!fields.length || verification.active || bulkWorking} className="text-xs font-semibold px-3 py-2 rounded-lg bg-lime-600 text-white disabled:opacity-50">{verification.active ? `Verifying ${verification.completed}/${verification.total}` : "Verify page fields"}</button></div>{verification.error && <p className="text-xs text-red-300">{verification.error}</p>}{!verification.active && verification.completed === verification.total && verification.total > 0 && <p className="text-xs text-lime-300">All {verification.total} fields saved and reset successfully. Approved copy remains unchanged.</p>}</div>
        {!fields.length && <p className="text-gray-500 text-sm py-10 text-center">Loading public page fields…</p>}
        {fields.map((field) => {
          const isOverride = overrides.has(field.fieldKey);
          const value = drafts[field.fieldKey] ?? overrides.get(field.fieldKey) ?? field.value;
          return <div key={field.fieldKey} className="rounded-lg border border-gray-800 p-3 space-y-2">
            <div className="flex justify-between gap-3"><p className="text-xs text-gray-300 line-clamp-2">{field.label}</p>{isOverride && <span className="text-[10px] uppercase font-bold text-lime-400">Saved override</span>}</div>
            <textarea value={value} onChange={(event) => setDrafts((current) => ({ ...current, [field.fieldKey]: event.target.value }))} className="w-full min-h-16 bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-white" />
            <div className="flex gap-2"><button onClick={() => save.mutate({ token, routePath, fieldKey: field.fieldKey, value }, { onSuccess: refreshPreview })} disabled={save.isPending || bulkWorking} className="px-3 py-1.5 text-xs rounded-md bg-[#1260ae] font-semibold">Save to live site</button>{isOverride && <button onClick={() => { reset.mutate({ token, routePath, fieldKey: field.fieldKey }, { onSuccess: refreshPreview }); setDrafts((current) => ({ ...current, [field.fieldKey]: field.value })); }} className="px-3 py-1.5 text-xs rounded-md bg-gray-800 text-gray-200">Reset source copy</button>}</div>
          </div>;
        })}
      </div>
    </div>
  </div>;
}
