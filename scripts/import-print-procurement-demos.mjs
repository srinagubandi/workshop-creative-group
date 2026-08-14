/**
 * Imports owner-approved demo visuals into the private Railway bucket through
 * the same protected Media Library API an administrator uses. Files are clearly
 * labelled as non-client samples and are safe to rerun without duplicate imports.
 */
import { readFile } from "node:fs/promises";
const baseUrl = (process.env.WSCG_BASE_URL || "https://web-production-d7aa.up.railway.app").replace(/\/$/, "");
const password = process.env.ADMIN_PASSWORD;
if (!password) throw new Error("Set ADMIN_PASSWORD before importing demo assets.");

const demos = [
  {
    filePath: "/home/ubuntu/webdev-static-assets/print-procurement-demo-branded-materials.jpg",
    filename: "print-procurement-demo-branded-materials.png",
    title: "Demo Sample — B2B Print Materials",
    project: "B2B print materials concept",
    altText: "Demo sample arrangement of generic printed brochures, folders, and business cards; not client work.",
  },
  {
    filePath: "/home/ubuntu/webdev-static-assets/print-procurement-demo-packaging.jpg",
    filename: "print-procurement-demo-packaging.png",
    title: "Demo Sample — Custom Packaging",
    project: "Custom packaging concept",
    altText: "Demo sample of generic custom printed packaging; not client work.",
  },
  {
    filePath: "/home/ubuntu/webdev-static-assets/print-procurement-demo-pop-display.jpg",
    filename: "print-procurement-demo-pop-display.png",
    title: "Demo Sample — Point-of-Purchase Display",
    project: "Retail display concept",
    altText: "Demo sample of a generic point-of-purchase display; not client work.",
  },
  {
    filePath: "/home/ubuntu/webdev-static-assets/print-procurement-demo-direct-mail.jpg",
    filename: "print-procurement-demo-direct-mail.png",
    title: "Demo Sample — Direct Mail Collateral",
    project: "Direct mail concept",
    altText: "Demo sample of generic direct mail collateral; not client work.",
  },
];

async function trpc(procedure, input, token, method = "GET") {
  const suffix = method === "GET" ? `?input=${encodeURIComponent(JSON.stringify({ json: input }))}` : "?batch=1";
  const response = await fetch(`${baseUrl}/api/trpc/${procedure}${suffix}`, method === "GET" ? {} : {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ 0: { json: input } }),
  });
  const payload = await response.json();
  const value = Array.isArray(payload) ? payload[0] : payload;
  if (!response.ok || value?.error) throw new Error(`${procedure} failed: ${JSON.stringify(value?.error || payload).slice(0, 300)}`);
  return value.result?.data?.json;
}

const login = await trpc("admin.login", { password }, undefined, "POST");
const token = login.token;
const existing = await trpc("admin.mediaAssets", { token });
const results = [];

for (const demo of demos) {
  let asset = existing.find((candidate) => candidate.originalFilename === demo.filename);
  if (!asset) {
    const source = await readFile(demo.filePath);
    const form = new FormData();
    form.append("file", new Blob([source], { type: "image/png" }), demo.filename);
    const upload = await fetch(`${baseUrl}/api/admin/media/upload`, {
      method: "POST",
      headers: { "x-wscg-admin-token": token },
      body: form,
    });
    const payload = await upload.json();
    if (!upload.ok) throw new Error(`Upload failed for ${demo.filename}: ${payload.error || upload.status}`);
    asset = payload.asset;
  }

  await trpc("admin.updateMedia", {
    token,
    id: asset.id,
    title: demo.title,
    caption: "Demo sample image — illustrative only, not client portfolio work.",
    altText: demo.altText,
  }, token, "POST");

  const placements = await trpc("admin.mediaAssets", { token });
  const current = placements.find((candidate) => candidate.id === asset.id);
  const galleryPlacement = current?.placements?.find((placement) => placement.pageKey === "gallery");
  const placementInput = {
    token,
    pageKey: "gallery",
    category: "print-procurement",
    client: "Demo Sample",
    project: demo.project,
    sortOrder: 100 + demos.indexOf(demo),
  };
  if (galleryPlacement) await trpc("admin.updateMediaPlacement", { ...placementInput, id: galleryPlacement.id }, token, "POST");
  else await trpc("admin.addMediaPlacement", { ...placementInput, mediaId: asset.id }, token, "POST");
  await trpc("admin.publishMedia", { token, id: asset.id }, token, "POST");
  results.push({ id: asset.id, title: demo.title });
}

console.log(JSON.stringify({ imported: results.length, assets: results }, null, 2));
