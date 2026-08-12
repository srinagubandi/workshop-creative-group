/**
 * Gallery — Workshop Creative Group Portfolio
 *
 * Filterable grid of 145 work samples across:
 * - Large Format Printing (77)
 * - Graphic Design (31)
 * - Branding (14)
 * - Client Logos (23)
 *
 * Features:
 * - Tab filter by category
 * - Masonry-style responsive grid
 * - Lightbox on click (keyboard accessible)
 * - Client name + project type parsed from filename
 */

import PageLayout from "@/components/PageLayout";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryItem } from "@/data/gallery";
import { trpc } from "@/lib/trpc";
import { useCallback, useEffect, useState } from "react";

type ManagedGalleryItem = GalleryItem & { id?: number; mediaType?: "image" | "video"; thumbnailSrc?: string | null };

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose, onPrev, onNext }: {
  item: ManagedGalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200 z-10"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {item.mediaType === "video" ? (
          <video src={item.src} controls className="max-w-full max-h-[75vh] rounded-xl shadow-2xl" aria-label={item.alt} />
        ) : (
          <img src={item.src} alt={item.alt} className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" loading="eager" />
        )}
        <div className="text-center">
          <p className="text-white font-semibold text-base">{item.client}</p>
          <p className="text-white/60 text-sm">{item.project} · {item.categoryLabel}</p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200 z-10"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({ item, onClick }: { item: ManagedGalleryItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left w-full"
      aria-label={`View ${item.client} — ${item.project}`}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        {item.mediaType === "video" ? (
          item.thumbnailSrc ? <img src={item.thumbnailSrc} alt={item.alt} loading="lazy" decoding="async" fetchPriority="low" className="w-full h-full object-cover" /> : <video src={item.src} muted playsInline preload="metadata" className="w-full h-full object-cover" aria-label={`${item.alt} video preview`} />
        ) : !error ? (
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{item.client}</p>
          <p className="text-white/75 text-xs mt-0.5">{item.project}</p>
        </div>
        <div className="ml-auto">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom label (always visible) */}
      <div className="p-3 border-t border-gray-100">
        <p className="font-semibold text-gray-900 text-xs truncate">{item.client}</p>
        <p className="text-gray-500 text-xs truncate">{item.project}</p>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const managedGallery = trpc.media.gallery.useQuery();
  const galleryItems: ManagedGalleryItem[] = managedGallery.data?.length ? managedGallery.data : GALLERY_ITEMS;

  const filtered = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % filtered.length : null), [filtered.length]);

  return (
    <PageLayout
      title="Our Work | Portfolio Gallery | Workshop Creative Group"
      description="Browse Workshop Creative Group's portfolio of large format printing, graphic design, branding, and print procurement work for clients nationwide."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="gallery-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Portfolio
            </span>
            <h1 id="gallery-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Our Work
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              A selection of large format printing, graphic design, branding, and print procurement projects delivered for clients nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-py bg-white" aria-labelledby="gallery-grid-heading">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {GALLERY_CATEGORIES.map((cat) => {
              const count = cat.key === "all"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={activeCategory === cat.key ? { background: "#1260ae" } : {}}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-normal ${
                    activeCategory === cat.key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="text-center text-sm text-gray-400 mb-8">
            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <h2 id="gallery-grid-heading" className="sr-only">Portfolio gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.src}
                item={item}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </PageLayout>
  );
}
