import { trpc } from "@/lib/trpc";
import { getTestimonialLayout } from "../../../shared/testimonialPresentation";

export function TestimonialSection() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  if (!testimonials?.length) return null;
  const layout = getTestimonialLayout(testimonials.length);
  return <section className="section-py bg-white" aria-labelledby="testimonial-heading">
    <div className="container">
      <div className="text-center mb-12"><span className="section-label justify-center mb-4">Client Perspective</span><h2 id="testimonial-heading" className="text-heading text-3xl md:text-4xl text-gray-900">Trusted for Quality, Service, and Value</h2></div>
      <div className={layout === "single" ? "max-w-4xl mx-auto" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"}>
        {testimonials.map((item) => <figure key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-7 md:p-9 shadow-sm flex flex-col">
          <svg className="w-9 h-9 mb-5" style={{ color: "#1260ae" }} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.8 7C5.5 9.1 3.5 12.8 3.5 18.1c0 4.1 2.4 6.9 5.9 6.9 3.4 0 5.8-2.5 5.8-5.8 0-3.2-2.1-5.3-5-5.3-.6 0-1.2.1-1.8.3.6-1.8 2-3.2 4.3-4.1L9.8 7Zm13.3 0c-4.3 2.1-6.3 5.8-6.3 11.1 0 4.1 2.4 6.9 5.9 6.9 3.4 0 5.8-2.5 5.8-5.8 0-3.2-2.1-5.3-5-5.3-.6 0-1.2.1-1.8.3.6-1.8 2-3.2 4.3-4.1L23.1 7Z" /></svg>
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-gray-800">“{item.quote}”</blockquote>
          <figcaption className="mt-7 pt-5 border-t border-gray-200 flex items-center gap-4">
            {item.mediaSrc ? <img src={item.mediaSrc} alt={item.mediaAlt} className="h-12 w-12 rounded-xl object-cover bg-white border border-gray-200" loading="lazy" /> : <div className="h-12 w-12 rounded-xl flex items-center justify-center font-serif font-bold text-lg text-white" style={{ background: "#1260ae" }}>{item.authorName.charAt(0)}</div>}
            <div><div className="font-semibold text-gray-900">{item.authorName}</div>{item.authorTitle && <div className="text-sm text-gray-500">{item.authorTitle}</div>}{item.company && <div className="text-sm font-medium" style={{ color: "#1260ae" }}>{item.company}</div>}</div>
          </figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
