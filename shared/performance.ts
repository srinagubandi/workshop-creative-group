export function getStaticCacheControl(filePath: string) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  if (/\/assets\/.*[-.][a-z0-9]{8,}\.(js|css)$/i.test(normalizedPath)) {
    return "public, max-age=31536000, immutable";
  }
  if (/\/(gallery|images)\//i.test(normalizedPath)) {
    return "public, max-age=604800, stale-while-revalidate=86400";
  }
  return null;
}
