/**
 * Repeatable non-destructive live client verification for Railway.
 *
 * Requires ADMIN_PASSWORD only at runtime. It checks public pages, admin login,
 * media-library queries, the draft preview route, forms data queries, and public
 * gallery/testimonial queries. It does not publish, archive, update, or upload.
 */
import { writeFile } from 'node:fs/promises';

const baseUrl = (process.env.WSCG_BASE_URL || 'https://web-production-d7aa.up.railway.app').replace(/\/$/, '');
const password = process.env.ADMIN_PASSWORD;
const loops = Number(process.env.WSCG_VERIFY_LOOPS || 25);
const concurrency = Number(process.env.WSCG_VERIFY_CONCURRENCY || 3);

if (!password) throw new Error('Set ADMIN_PASSWORD before running the verification.');
if (!Number.isInteger(loops) || loops < 1 || loops > 100) throw new Error('WSCG_VERIFY_LOOPS must be an integer between 1 and 100.');
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 5) throw new Error('WSCG_VERIFY_CONCURRENCY must be an integer between 1 and 5.');

async function trpc(procedure, input, token, method = 'GET') {
  const suffix = method === 'GET'
    ? `?input=${encodeURIComponent(JSON.stringify({ json: input }))}`
    : '?batch=1';
  const response = await fetch(`${baseUrl}/api/trpc/${procedure}${suffix}`, method === 'GET' ? {} : {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ 0: { json: input } }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${procedure} returned ${response.status}: ${text.slice(0, 240)}`);
  const payload = JSON.parse(text);
  const value = Array.isArray(payload) ? payload[0] : payload;
  if (value.error) throw new Error(`${procedure} returned an application error: ${JSON.stringify(value.error).slice(0, 240)}`);
  return value.result?.data?.json;
}

async function get(path) {
  const started = performance.now();
  const response = await fetch(`${baseUrl}${path}`, { redirect: 'follow' });
  const elapsedMs = Math.round(performance.now() - started);
  if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status}`);
  return { path, elapsedMs };
}

const report = { baseUrl, startedAt: new Date().toISOString(), loops, results: [], failures: [] };
const publicPaths = ['/', '/about', '/large-format-printing', '/graphic-design', '/print-procurement', '/gallery', '/request-quote', '/contact'];

async function runLoop(loop) {
  const entry = { loop, publicRoutes: [], admin: {}, passed: false };
  try {
    const login = await trpc('admin.login', { password }, undefined, 'POST');
    if (!login?.token) throw new Error('Admin login did not return a session token.');
    const token = login.token;
    entry.admin.session = Boolean(await trpc('admin.me', { token }));
    const pathA = publicPaths[(loop - 1) % publicPaths.length];
    const pathB = publicPaths[(loop + 2) % publicPaths.length];
    entry.publicRoutes = await Promise.all([get(pathA), get(pathB)]);

    // Rotate protected/admin workflows so all are repeated across the 25 loops
    // without serially repeating the full dashboard on every individual pass.
    switch ((loop - 1) % 5) {
      case 0: {
        const [published, drafts, archived] = await Promise.all([
          trpc('admin.mediaAssets', { token, status: 'published' }),
          trpc('admin.mediaAssets', { token, status: 'draft' }),
          trpc('admin.mediaAssets', { token, status: 'archived' }),
        ]);
        entry.admin.media = published.length;
        entry.admin.drafts = drafts.length;
        const previewCandidate = [...drafts, ...archived].find((asset) => asset.storageKey);
        if (previewCandidate) {
          const previewResponse = await fetch(`${baseUrl}/api/admin/media/${previewCandidate.id}/preview?token=${encodeURIComponent(token)}`);
          entry.admin.privatePreview = previewResponse.status === 200;
          if (!entry.admin.privatePreview) throw new Error(`Draft/archive preview returned ${previewResponse.status}.`);
        }
        break;
      }
      case 1: {
        const [quotes, contacts] = await Promise.all([trpc('admin.quotes', { token }), trpc('admin.contacts', { token })]);
        entry.admin.quotes = quotes.length;
        entry.admin.contacts = contacts.length;
        break;
      }
      case 2:
        entry.admin.backups = (await trpc('admin.backups', { token })).length;
        break;
      case 3: {
        const gallery = await trpc('media.gallery', {});
        if (!Array.isArray(gallery)) throw new Error('Public gallery query returned an unexpected response.');
        entry.admin.galleryItems = gallery.length;
        break;
      }
      default: {
        const testimonials = await trpc('testimonials.list', {});
        if (!Array.isArray(testimonials)) throw new Error('Public testimonial query returned an unexpected response.');
        entry.admin.testimonials = testimonials.length;
      }
    }
    entry.passed = true;
  } catch (error) {
    entry.error = error instanceof Error ? error.message : String(error);
    report.failures.push({ loop, error: entry.error });
  }
  report.results.push(entry);
}

for (let start = 1; start <= loops; start += concurrency) {
  const batch = Array.from({ length: Math.min(concurrency, loops - start + 1) }, (_, index) => runLoop(start + index));
  await Promise.all(batch);
}

report.finishedAt = new Date().toISOString();
report.passedLoops = report.results.filter((entry) => entry.passed).length;
await writeFile('/tmp/wscg-client-verification.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ loops, passedLoops: report.passedLoops, failures: report.failures.length, report: '/tmp/wscg-client-verification.json' }));
if (report.failures.length) process.exitCode = 1;
