import { GALLERY_ITEMS, type GalleryItem } from "@/data/gallery";
import { trpc } from "@/lib/trpc";

type PublishedMediaStripProps = {
  category: string;
  eyebrow: string;
  heading: string;
  description?: string;
  limit?: number;
  variant?: "work" | "logos";
};

export function PublishedMediaStrip({
  category,
  eyebrow,
  heading,
  description,
  limit = 3,
  variant = "work",
}: PublishedMediaStripProps) {
  const managedGallery = trpc.media.gallery.useQuery();
  const galleryItems: GalleryItem[] = managedGallery.data?.length ? managedGallery.data : GALLERY_ITEMS;
  const items = galleryItems.filter((item) => item.category === category).slice(0, limit);

  if (!items.length) return null;

  const isLogoStrip = variant === "logos";

  return (
    <section className={isLogoStrip ? "section-py bg-gray-50" : "pb-16 bg-white"} aria-labelledby={`${category}-media-heading`}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <span className="section-label justify-center mb-4">{eyebrow}</span>
          <h2 id={`${category}-media-heading`} className="text-heading text-3xl md:text-4xl text-gray-900 mb-3">{heading}</h2>
          {description && <p className="public-helper-text text-base leading-relaxed">{description}</p>}
        </div>
        <div className={isLogoStrip ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto" : "grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto"}>
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
        {isLogoStrip && <p className="mt-5 text-center public-helper-text text-sm">A static selection of published portfolio logo assets. This display does not animate or scroll automatically.</p>}
      </div>
    </section>
  );
}
