import { useState } from "react";
import { GALLERY_ITEMS, type GalleryItem } from "@/data/gallery";
import { trpc } from "@/lib/trpc";

type PublishedMediaStripProps = {
  category: string;
  eyebrow: string;
  heading: string;
  description?: string;
  limit?: number;
  variant?: "work" | "logos";
  expandable?: boolean;
};

export function PublishedMediaStrip({
  category,
  eyebrow,
  heading,
  description,
  limit = 3,
  variant = "work",
  expandable = false,
}: PublishedMediaStripProps) {
  const [showAll, setShowAll] = useState(false);
  const managedGallery = trpc.media.gallery.useQuery();
  const galleryItems: GalleryItem[] = managedGallery.data?.length ? managedGallery.data : GALLERY_ITEMS;
  const allItems = galleryItems.filter((item) => item.category === category);
  const isLogoStrip = variant === "logos";
  const isExpandableLogoStrip = isLogoStrip && expandable && allItems.length > limit;
  const items = isExpandableLogoStrip && !showAll ? allItems.slice(0, limit) : allItems.slice(0, isLogoStrip ? allItems.length : limit);
  const remainingCount = Math.max(0, allItems.length - limit);
  const galleryId = `${category}-media-grid`;

  if (!items.length) return null;

  return (
    <section className={isLogoStrip ? "section-py bg-gray-50" : "pb-16 bg-white"} aria-labelledby={`${category}-media-heading`}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <span className="section-label justify-center mb-4">{eyebrow}</span>
          <h2 id={`${category}-media-heading`} className="text-heading text-3xl md:text-4xl text-gray-900 mb-3">{heading}</h2>
          {description && <p className="public-helper-text text-base leading-relaxed">{description}</p>}
        </div>
        <div id={galleryId} className={isLogoStrip ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto" : "grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto"}>
          {items.map((item) => (
            <figure key={`${item.src}-${item.client}-${item.project}`} className={isLogoStrip ? "rounded-xl border border-gray-200 bg-white p-5 flex items-center justify-center min-h-28 shadow-sm" : "rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"}>
              <img
                src={item.src}
                alt={item.alt || `${item.client} — ${item.project}`}
                loading="lazy"
                decoding="async"
                className={isLogoStrip ? "w-full h-16 object-contain" : "w-full aspect-[4/3] object-cover"}
              />
              {!isLogoStrip && (
                <figcaption className="p-4 bg-white">
                  <p className="font-semibold text-gray-900 text-sm">{item.client}</p>
                  <p className="public-helper-text text-xs mt-1">{item.project}</p>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
        {isLogoStrip && (
          <div className="mt-5 text-center">
            <p className="public-helper-text text-sm">Published client logo work is shown as a static gallery. This display does not animate or scroll automatically.</p>
            {isExpandableLogoStrip && (
              <button
                type="button"
                className="btn-secondary mt-5 inline-flex"
                aria-controls={galleryId}
                aria-expanded={showAll}
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll ? "Show fewer client logos" : `Show ${remainingCount} more client logo${remainingCount === 1 ? "" : "s"}`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
