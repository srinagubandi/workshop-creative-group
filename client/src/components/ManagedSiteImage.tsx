import { trpc } from "@/lib/trpc";
import { MANAGED_SITE_ASSET_QUERY_OPTIONS } from "@/lib/renderingPerformance";

export function ManagedSiteImage({ slotKey, fallbackSrc, alt, className, loading = "lazy", fetchPriority = "auto" }: { slotKey: string; fallbackSrc: string; alt: string; className?: string; loading?: "eager" | "lazy"; fetchPriority?: "high" | "low" | "auto" }) {
  const media = trpc.media.siteAsset.useQuery({ slotKey }, MANAGED_SITE_ASSET_QUERY_OPTIONS);
  return <img src={media.data?.src || fallbackSrc} alt={media.data?.alt || alt} className={className} loading={loading} fetchPriority={fetchPriority} decoding="async" />;
}
