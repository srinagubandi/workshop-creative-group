import { trpc } from "@/lib/trpc";

export function ManagedSiteImage({ slotKey, fallbackSrc, alt, className, loading = "lazy", fetchPriority = "auto" }: { slotKey: string; fallbackSrc: string; alt: string; className?: string; loading?: "eager" | "lazy"; fetchPriority?: "high" | "low" | "auto" }) {
  const media = trpc.media.siteAsset.useQuery({ slotKey }, { staleTime: 24 * 60 * 60_000, gcTime: 24 * 60 * 60_000, refetchOnWindowFocus: false });
  return <img src={media.data?.src || fallbackSrc} alt={media.data?.alt || alt} className={className} loading={loading} fetchPriority={fetchPriority} decoding="async" />;
}
