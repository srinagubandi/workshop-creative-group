import { trpc } from "@/lib/trpc";
import { useState } from "react";

function TestimonialQuote({
  quote,
  quoteId,
  authorName,
}: {
  quote: string;
  quoteId: string;
  authorName: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = quote.length > 320;
  const preview = canCollapse && !expanded ? `${quote.slice(0, 320).trimEnd()}…` : quote;

  return (
    <div className="mt-6">
      <blockquote
        id={quoteId}
        className="font-serif text-base leading-8 text-gray-800 md:text-[1.0625rem]"
      >
        <span aria-hidden="true" className="text-2xl leading-none align-top" style={{ color: "#1261ae" }}>
          “
        </span>
        {preview}
        <span aria-hidden="true" className="text-2xl leading-none align-top" style={{ color: "#1261ae" }}>
          ”
        </span>
      </blockquote>
      {canCollapse && (
        <button
          type="button"
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition-colors hover:border-blue-700 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          aria-expanded={expanded}
          aria-controls={quoteId}
          aria-label={`${expanded ? "Show less of" : "Read the full"} testimonial from ${authorName}`}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Read full perspective"}
        </button>
      )}
    </div>
  );
}

export function TestimonialSection() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  if (!testimonials?.length) return null;

  return (
    <section className="section-py bg-slate-50" aria-labelledby="testimonial-heading">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="section-label justify-center mb-4">Client Perspective</span>
          <h2 id="testimonial-heading" className="text-heading text-3xl text-gray-900 md:text-4xl">
            Trusted for Quality, Service, and Value
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            A selection of client perspectives. Use the available button to read a complete testimonial; this section does not rotate or advance automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Client testimonials">
          {testimonials.map((item, index) => {
            const quoteId = `testimonial-quote-${item.id ?? index}`;
            return (
              <figure
                key={item.id}
                role="listitem"
                className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-7"
              >
                <figcaption className="flex items-center gap-4 border-b border-slate-200 pb-5">
                  {item.mediaSrc ? (
                    <img
                      src={item.mediaSrc}
                      alt={item.mediaAlt}
                      className="h-12 w-12 shrink-0 rounded-full border border-slate-200 bg-white object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold text-white"
                      style={{ background: "#1261ae" }}
                      aria-hidden="true"
                    >
                      {item.authorName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold leading-6 text-gray-900">{item.authorName}</div>
                    {item.authorTitle && <div className="text-sm leading-5 text-gray-600">{item.authorTitle}</div>}
                    {item.company && <div className="text-sm font-semibold leading-5" style={{ color: "#1261ae" }}>{item.company}</div>}
                  </div>
                </figcaption>
                <TestimonialQuote quote={item.quote} quoteId={quoteId} authorName={item.authorName} />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
