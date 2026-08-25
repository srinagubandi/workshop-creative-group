import type { ComponentType } from "react";

type PageModule = { default: ComponentType<any> };

export const PUBLIC_PAGE_IMPORTERS = {
  about: () => import("../pages/About"),
  accessibility: () => import("../pages/Accessibility"),
  blog: () => import("../pages/Blog"),
  contact: () => import("../pages/Contact"),
  graphicDesign: () => import("../pages/GraphicDesign"),
  home: () => import("../pages/Home"),
  largeFormat: () => import("../pages/LargeFormat"),
  printProcurement: () => import("../pages/PrintProcurement"),
  privacy: () => import("../pages/Privacy"),
  blogPost: () => import("../pages/BlogPost"),
  gallery: () => import("../pages/Gallery"),
  admin: () => import("../pages/Admin"),
  requestQuote: () => import("../pages/RequestQuote"),
  terms: () => import("../pages/Terms"),
} satisfies Record<string, () => Promise<PageModule>>;

export const MANAGED_SITE_ASSET_QUERY_OPTIONS = {
  staleTime: 24 * 60 * 60_000,
  gcTime: 24 * 60 * 60_000,
  refetchOnWindowFocus: false,
} as const;

export const MANAGED_SITE_IMAGE_DEFAULTS = {
  loading: "lazy",
  fetchPriority: "auto",
} as const;

export const NAVIGATION_LOGO_IMAGE_OPTIONS = {
  loading: "eager",
  fetchPriority: "high",
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
