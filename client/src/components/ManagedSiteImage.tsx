import { trpc } from "@/lib/trpc";

export function ManagedSiteImage({ slotKey, fallbackSrc, alt, className }: { slotKey: string; fallbackSrc: string; alt: string; className?: string }) {
  const media = trpc.media.siteAsset.useQuery({ slotKey }, { staleTime: 60_000 });
  return <img src={media.data?.src || fallbackSrc} alt={media.data?.alt || alt} className={className} />;
}
