import type { ComponentType } from "react";

type PageModule = { default: ComponentType<any> };

export const PUBLIC_PAGE_IMPORTERS = {
  about: () => import("../pages/About"),
  blog: () => import("../pages/Blog"),
  contact: () => import("../pages/Contact"),
  graphicDesign: () => import("../pages/GraphicDesign"),
  home: () => import("../pages/Home"),
  largeFormat: () => import("../pages/LargeFormat"),
  printProcurement: () => import("../pages/PrintProcurement"),
  blogPost: () => import("../pages/BlogPost"),
  gallery: () => import("../pages/Gallery"),
  admin: () => import("../pages/Admin"),
  requestQuote: () => import("../pages/RequestQuote"),
} satisfies Record<string, () => Promise<PageModule>>;

export const MANAGED_SITE_ASSET_QUERY_OPTIONS = {
  staleTime: 24 * 60 * 60_000,
  gcTime: 24 * 60 * 60_000,
  refetchOnWindowFocus: false,
} as const;

export interface BlogPresentationItem {
  id: number;
  featured: number;
}

export function getBlogPresentation<T extends BlogPresentationItem>(posts: T[] | undefined, fallback: T[]) {
  const displayPosts = posts && posts.length > 0 ? posts : fallback;
  const featuredPost = displayPosts.find((post) => post.featured === 1) ?? null;
  return {
    displayPosts,
    featuredPost,
    otherPosts: displayPosts.filter((post) => post.id !== featuredPost?.id),
  };
}
