import { createTestimonial, listTestimonials } from "./db";

const RADFORD_TESTIMONIAL = {
  quote: "Working with Brent at Workshop Creative Group has been an outstanding experience from start to finish. We commissioned a bespoke 3D Radford sign for our headquarters at The Motor Enclave in Tampa, Florida, and the finished product exceeded every expectation. The attention to detail is exceptional, the build quality is first-class, and the final result perfectly captures the premium standards that Radford represents as a luxury automotive brand. What impressed us just as much was the value for money. The quality of the craftsmanship far exceeded what we expected for the price, making it one of the best investments we've made in presenting our brand. Installation was incredibly straightforward, with everything arriving precisely as promised and ready to fit, allowing us to have the sign mounted quickly and with minimal effort. If you're looking for high-quality bespoke signage backed by excellent customer service, outstanding craftsmanship, and great value, I would have no hesitation in recommending Brent Gardner and Workshop Creative Group. We couldn't be happier with the finished result and look forward to working with Brent again on future Radford projects.",
  authorName: "Ian Readman",
  authorTitle: "Chief Operating Officer",
  company: "Radford Motor Company LLC",
} as const;

export async function seedOwnerTestimonial() {
  const existing = await listTestimonials();
  if (existing.some((item) => item.authorName === RADFORD_TESTIMONIAL.authorName && item.company === RADFORD_TESTIMONIAL.company)) return;
  await createTestimonial({ ...RADFORD_TESTIMONIAL, status: "published", sortOrder: 0, mediaId: null, publishedAt: new Date(), archivedAt: null });
  console.log("[Testimonials] Seeded owner-provided Radford testimonial");
}
