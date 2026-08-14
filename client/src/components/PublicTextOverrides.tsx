import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { applyTextOverrides } from "@/lib/textOverrides";

export function PublicTextOverrides() {
  const [path] = useLocation();
  const routePath = path.startsWith("/blog/") ? "/blog/:slug" : path;
  const overridesQ = trpc.content.overrides.useQuery({ routePath }, { enabled: path !== "/admin", staleTime: 30_000 });

  useEffect(() => {
    if (path === "/admin" || !overridesQ.data?.length) return;
    const apply = () => applyTextOverrides(document, overridesQ.data!);
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.querySelector("#root") || document.body, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [path, overridesQ.data]);
  return null;
}
