import { trpc } from "@/lib/trpc";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getThumbnailResetLabel } from "../../../shared/thumbnailPresentation";

type Placement = {
  id: number;
  pageKey: string;
  category: string | null;
  client: string | null;
  project: string | null;
  sortOrder: number;
};

type MediaAsset = {
  id: number;
  mediaType: "image" | "video";
  status: "draft" | "published" | "archived";
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  title: string | null;
  caption: string | null;
  altText: string | null;
  legacyPath: string | null;
  originalKey: string | null;
  thumbnailMediaId: number | null;
  placements: Placement[];
};

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const categories = ["large-format", "graphic-design", "branding", "logos", "print-procurement", "brand-and-system"];

function formatBytes(value: number) {
  return value < 1024 * 1024 ? `${Math.max(1, Math.round(value / 1024))} KB` : `${(value / 1024 / 1024).toFixed(1)} MB`;
}

async function imageDimensions(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("The image could not be read.")); image.src = objectUrl; });
    return { width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function renderEditedImage(file: File, rotation: number, zoom: number) {
  const source = await imageDimensions(file);
  const imageUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("The image could not be edited.")); image.src = imageUrl; });
    const sideways = Math.abs(rotation % 180) === 90;
    const canvas = document.createElement("canvas");
    canvas.width = sideways ? source.height : source.width;
    canvas.height = sideways ? source.width : source.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser does not support image editing.");
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((rotation * Math.PI) / 180);
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height) * zoom;
    context.drawImage(image, -image.width * scale / 2, -image.height * scale / 2, image.width * scale, image.height * scale);
    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, type, 0.92));
    if (!blob) throw new Error("Could not create edited image.");
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + "-edited." + (type === "image/png" ? "png" : "jpg"), { type });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export function MediaManager({ token }: { token: string }) {
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [replaceTarget, setReplaceTarget] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const editPreviewUrl = useMemo(() => editingFile ? URL.createObjectURL(editingFile) : null, [editingFile]);
  useEffect(() => () => { if (editPreviewUrl) URL.revokeObjectURL(editPreviewUrl); }, [editPreviewUrl]);

  const mediaQuery = trpc.admin.mediaAssets.useQuery({ token, status });
  const allMediaQuery = trpc.admin.mediaAssets.useQuery({ token });
  const utils = trpc.useUtils();
  const refresh = () => { mediaQuery.refetch(); utils.media.gallery.invalidate(); };
  const update = trpc.admin.updateMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const addPlacement = trpc.admin.addMediaPlacement.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const updatePlacement = trpc.admin.updateMediaPlacement.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const publish = trpc.admin.publishMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const unpublish = trpc.admin.unpublishMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const archive = trpc.admin.archiveMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const restore = trpc.admin.restoreMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const replace = trpc.admin.replaceMedia.useMutation({ onSuccess: () => { setNotice("The selected asset was replaced and the prior image remains recoverable in its history."); refresh(); }, onError: e => setError(e.message) });
  const reorder = trpc.admin.reorderMedia.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });
  const setThumbnail = trpc.admin.setMediaThumbnail.useMutation({ onSuccess: refresh, onError: e => setError(e.message) });

  const assets = (mediaQuery.data ?? []) as MediaAsset[];
  const thumbnailCandidates = ((allMediaQuery.data ?? []) as MediaAsset[]).filter(asset => asset.mediaType === "image" && asset.status !== "archived");
  const filteredAssets = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return assets;
    return assets.filter(asset => [asset.originalFilename, asset.title, asset.caption, asset.altText, asset.placements[0]?.client, asset.placements[0]?.project, asset.placements[0]?.category].some(value => value?.toLowerCase().includes(term)));
  }, [assets, search]);
  const groups = useMemo(() => {
    const result: Record<string, MediaAsset[]> = {};
    filteredAssets.forEach(asset => {
      const label = asset.placements[0]?.category || asset.placements[0]?.pageKey || "Unassigned";
      (result[label] ||= []).push(asset);
    });
    Object.values(result).forEach(group => group.sort((a, b) => (a.placements[0]?.sortOrder ?? 0) - (b.placements[0]?.sortOrder ?? 0)));
    return result;
  }, [filteredAssets]);

  async function validateFile(file: File) {
    const isImage = IMAGE_TYPES.includes(file.type);
    const isVideo = VIDEO_TYPES.includes(file.type);
    if (!isImage && !isVideo) throw new Error("Unsupported format. Use JPG, PNG, WebP, MP4, or WebM.");
    const limit = isImage ? 20 * 1024 * 1024 : 250 * 1024 * 1024;
    if (file.size > limit) throw new Error(`${isImage ? "Images" : "Videos"} must be smaller than ${isImage ? "20 MB" : "250 MB"}. Your file is ${formatBytes(file.size)}.`);
    if (isImage) {
      const dimensions = await imageDimensions(file);
      if (dimensions.width > 6000 || dimensions.height > 6000) throw new Error(`Image dimensions are ${dimensions.width} × ${dimensions.height}; each side must be 6,000 px or smaller.`);
    }
  }

  async function uploadFile(file: File, targetId?: number | null, originalFile?: File | null) {
    setError(null); setNotice(null); setUploading(true);
    try {
      await validateFile(file);
      const body = new FormData(); body.append("file", file);
      if (originalFile && originalFile !== file) body.append("original", originalFile);
      const response = await fetch("/api/admin/media/upload", { method: "POST", headers: { "x-wscg-admin-token": token }, body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Upload failed.");
      if (targetId) replace.mutate({ token, targetId, replacementId: payload.asset.id });
      else { setNotice("Upload complete. The new asset is saved as a draft; add its placement and publish when ready."); refresh(); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false); setEditingFile(null); setReplaceTarget(null); setRotation(0); setZoom(1);
    }
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>, targetId?: number) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (IMAGE_TYPES.includes(file.type)) { setEditingFile(file); setReplaceTarget(targetId ?? null); }
    else uploadFile(file, targetId);
  }

  function move(asset: MediaAsset, direction: -1 | 1, peers: MediaAsset[]) {
    const placement = asset.placements[0];
    if (!placement) return;
    const current = peers.indexOf(asset); const next = current + direction;
    if (next < 0 || next >= peers.length) return;
    const ids = [...peers]; [ids[current], ids[next]] = [ids[next], ids[current]];
    const placementIds = ids.map(item => item.placements[0]?.id).filter((id): id is number => Boolean(id));
    if (placementIds.length) reorder.mutate({ token, placementIds });
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div><h2 className="text-white font-semibold text-lg">Media Library</h2><p className="text-gray-500 text-sm mt-1">Manage images and videos for all website pages. New files stay unpublished until you choose to publish them.</p></div>
        <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50" style={{ background: "#7dbe31" }}>
          {uploading ? "Uploading…" : "Upload image or video"}<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" disabled={uploading} onChange={event => handleFile(event)} />
        </label>
      </div>
      <div className="mb-5 grid sm:grid-cols-3 gap-3 text-xs text-gray-400">
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-3"><strong className="text-white block mb-1">Images</strong>JPG, PNG, WebP · maximum 20 MB · no side over 6,000 px.</div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-3"><strong className="text-white block mb-1">Video</strong>MP4 or WebM · maximum 250 MB. Videos are retained as supplied.</div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-3"><strong className="text-white block mb-1">Recovery</strong>Archive instead of delete. Originals and archived items remain recoverable.</div>
      </div>
      {error && <div className="mb-4 rounded-xl border border-red-700 bg-red-900/30 px-4 py-3 text-sm text-red-300">{error}</div>}
      {notice && <div className="mb-4 rounded-xl border border-green-700 bg-green-900/30 px-4 py-3 text-sm text-green-300">{notice}</div>}
      {editingFile && <div className="mb-6 rounded-xl border border-blue-700 bg-blue-900/20 p-4"><div className="flex flex-col md:flex-row gap-4"><img src={editPreviewUrl || ""} alt="Pending upload preview" className="h-40 w-full md:w-60 object-contain bg-black/30 rounded-lg" style={{ transform: `rotate(${rotation}deg) scale(${Math.min(zoom, 1.12)})` }} /><div className="flex-1"><h3 className="text-white font-semibold">Prepare image</h3><p className="text-gray-400 text-sm mt-1">Rotate the preview or use the crop-zoom control. The unedited original is stored privately alongside the edited output for recovery.</p><div className="mt-4 flex gap-2"><button onClick={() => setRotation(value => (value + 270) % 360)} className="rounded-lg bg-gray-800 px-3 py-2 text-xs text-white">Rotate left</button><button onClick={() => setRotation(value => (value + 90) % 360)} className="rounded-lg bg-gray-800 px-3 py-2 text-xs text-white">Rotate right</button></div><label className="block mt-4 text-xs text-gray-300">Crop zoom <input className="ml-3 align-middle" type="range" min="1" max="2" step="0.05" value={zoom} onChange={event => setZoom(Number(event.target.value))} /></label><div className="mt-4 flex gap-2"><button onClick={() => renderEditedImage(editingFile, rotation, zoom).then(edited => uploadFile(edited, replaceTarget, editingFile)).catch(err => setError(err.message))} className="rounded-lg px-4 py-2 text-xs font-semibold text-white" style={{ background: "#1260ae" }}>Upload edited image</button><button onClick={() => { setEditingFile(null); setReplaceTarget(null); }} className="rounded-lg bg-gray-800 px-4 py-2 text-xs text-gray-300">Cancel</button></div></div></div></div>}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-gray-800 pb-4 mb-5"><div className="flex gap-2">{(["published", "draft", "archived"] as const).map(value => <button key={value} onClick={() => setStatus(value)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${status === value ? "text-white" : "text-gray-400 hover:text-white"}`} style={status === value ? { background: "#1260ae" } : {}}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div><label className="sm:ml-auto text-xs text-gray-400">{status === "archived" ? "Search archived assets" : "Search media"}<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Filename, client, project…" className="mt-1 sm:mt-0 sm:ml-2 rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500" /></label></div>
      {mediaQuery.isLoading ? <p className="py-12 text-center text-gray-500">Loading media library…</p> : Object.keys(groups).length === 0 ? <p className="py-12 text-center text-gray-500">No {status} media yet.</p> : Object.entries(groups).map(([group, items]) => <div key={group} className="mb-8"><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{group.replace(/-/g, " ")}</h3><div className="grid gap-4 md:grid-cols-2">{items.map((asset, index) => <MediaCard key={asset.id} asset={asset} token={token} thumbnailCandidates={thumbnailCandidates} onSetThumbnail={(thumbnailMediaId) => setThumbnail.mutate({ token, id: asset.id, thumbnailMediaId })} onUpdate={(data) => update.mutate({ token, id: asset.id, ...data })} onPlacement={(data) => { const existing = asset.placements[0]; existing ? updatePlacement.mutate({ token, id: existing.id, ...data }) : addPlacement.mutate({ token, mediaId: asset.id, pageKey: data.pageKey || "gallery", category: data.category || undefined, client: data.client || undefined, project: data.project || undefined, sortOrder: 0 }); }} onPublish={() => publish.mutate({ token, id: asset.id })} onUnpublish={() => unpublish.mutate({ token, id: asset.id })} onArchive={() => archive.mutate({ token, id: asset.id })} onRestore={() => restore.mutate({ token, id: asset.id })} onReplace={event => handleFile(event, asset.id)} onMoveUp={() => move(asset, -1, items)} onMoveDown={() => move(asset, 1, items)} disableUp={index === 0} disableDown={index === items.length - 1} />)}</div></div>)}
    </section>
  );
}

function MediaCard({ asset, thumbnailCandidates, onSetThumbnail, onUpdate, onPlacement, onPublish, onUnpublish, onArchive, onRestore, onReplace, onMoveUp, onMoveDown, disableUp, disableDown }: { asset: MediaAsset; thumbnailCandidates: MediaAsset[]; onSetThumbnail: (id: number | null) => void; token: string; onUpdate: (data: { title?: string; caption?: string; altText?: string }) => void; onPlacement: (data: { pageKey?: string; category?: string; client?: string; project?: string }) => void; onPublish: () => void; onUnpublish: () => void; onArchive: () => void; onRestore: () => void; onReplace: (event: ChangeEvent<HTMLInputElement>) => void; onMoveUp: () => void; onMoveDown: () => void; disableUp: boolean; disableDown: boolean }) {
  const [title, setTitle] = useState(asset.title || ""); const [altText, setAltText] = useState(asset.altText || ""); const [caption, setCaption] = useState(asset.caption || "");
  const placement = asset.placements[0]; const [pageKey, setPageKey] = useState(placement?.pageKey || "gallery"); const [category, setCategory] = useState(placement?.category || "large-format"); const [client, setClient] = useState(placement?.client || ""); const [project, setProject] = useState(placement?.project || "");
  const preview = asset.thumbnailMediaId ? `/media/${asset.thumbnailMediaId}` : asset.legacyPath || `/media/${asset.id}`;
  return <article className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"><div className="flex gap-3 p-3 border-b border-gray-800"><div className="h-24 w-24 shrink-0 rounded-lg bg-gray-800 overflow-hidden flex items-center justify-center">{asset.mediaType === "video" && !asset.thumbnailMediaId ? <video src={preview} muted playsInline preload="metadata" className="h-full w-full object-cover" /> : <img src={preview} alt={asset.altText || asset.title || "Managed media"} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{asset.originalFilename}</p><p className="mt-1 text-xs text-gray-500">{formatBytes(asset.sizeBytes)}{asset.width && asset.height ? ` · ${asset.width} × ${asset.height}` : ""}</p><div className="mt-3 flex flex-wrap gap-2">{asset.status === "published" && <button onClick={onUnpublish} className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-200">Unpublish</button>}{asset.status === "draft" && <button onClick={onPublish} className="rounded px-2 py-1 text-xs font-semibold text-white" style={{ background: "#7dbe31" }}>Publish</button>}{asset.status === "archived" ? <button onClick={onRestore} className="rounded px-2 py-1 text-xs font-semibold text-white" style={{ background: "#1260ae" }}>Restore</button> : <button onClick={onArchive} className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">Archive</button>}<label className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 cursor-pointer">Replace<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" onChange={onReplace} /></label></div></div></div><div className="space-y-3 p-3"><label className="block text-xs text-gray-400">Thumbnail / poster<select value={asset.thumbnailMediaId ?? ""} onChange={e => onSetThumbnail(e.target.value ? Number(e.target.value) : null)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white"><option value="">{getThumbnailResetLabel(asset.mediaType)}</option>{thumbnailCandidates.filter(candidate => candidate.id !== asset.id).map(candidate => <option key={candidate.id} value={candidate.id}>{candidate.title || candidate.originalFilename}</option>)}</select></label><label className="block text-xs text-gray-400">Title<input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label><label className="block text-xs text-gray-400">Alt text<input value={altText} onChange={e => setAltText(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label><label className="block text-xs text-gray-400">Caption<textarea value={caption} onChange={e => setCaption(e.target.value)} rows={2} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label><div className="grid grid-cols-2 gap-2"><label className="text-xs text-gray-400">Page<input value={pageKey} onChange={e => setPageKey(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label><label className="text-xs text-gray-400">Category<select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white">{categories.map(value => <option key={value} value={value}>{value.replace(/-/g, " ")}</option>)}</select></label><label className="text-xs text-gray-400">Client<input value={client} onChange={e => setClient(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label><label className="text-xs text-gray-400">Project<input value={project} onChange={e => setProject(e.target.value)} className="mt-1 w-full rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-sm text-white" /></label></div><div className="flex flex-wrap gap-2 pt-1"><button onClick={() => onUpdate({ title, altText, caption })} className="rounded px-3 py-2 text-xs font-semibold text-white" style={{ background: "#1260ae" }}>Save details</button><button onClick={() => onPlacement({ pageKey, category, client, project })} className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-200">Save placement</button><button onClick={onMoveUp} disabled={disableUp} className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-300 disabled:opacity-40">Move ↑</button><button onClick={onMoveDown} disabled={disableDown} className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-300 disabled:opacity-40">Move ↓</button></div></div></article>;
}
