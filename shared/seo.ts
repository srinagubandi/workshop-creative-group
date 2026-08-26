export const SITE_ORIGIN = "https://www.workshopcreativegroup.com";

export type RouteMetadata = {
  title: string;
  description: string;
  path: string;
  pageType: "website" | "about" | "service" | "collection" | "contact";
  serviceName?: string;
};

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/": { path: "/", pageType: "website", title: "Commercial Printing & Graphic Design | Workshop Creative Group", description: "Workshop Creative Group helps businesses nationwide source commercial printing, large format printing, graphic design, and print procurement—often saving up to 20% on comparable print jobs." },
  "/about": { path: "/about", pageType: "about", title: "About Our Nationwide Print Brokerage | Workshop Creative Group", description: "Learn how Workshop Creative Group uses an experienced nationwide print network to simplify sourcing, improve quality control, and reduce print costs." },
  "/accessibility": { path: "/accessibility", pageType: "website", title: "Accessibility Statement | Workshop Creative Group", description: "Learn about Workshop Creative Group's accessibility commitment and how to report a website accessibility barrier or request assistance." },
  "/large-format-printing": { path: "/large-format-printing", pageType: "service", serviceName: "Large Format Printing", title: "Large Format Printing for Businesses Nationwide | Workshop Creative Group", description: "Source banners, signage, displays, retail graphics, and custom large format printing through Workshop Creative Group’s nationwide print network." },
  "/graphic-design": { path: "/graphic-design", pageType: "service", serviceName: "Graphic Design", title: "Graphic Design for Print & Brand Assets | Workshop Creative Group", description: "Get print-ready graphic design for marketing materials, campaigns, signage, and branded business assets through Workshop Creative Group." },
  "/print-procurement": { path: "/print-procurement", pageType: "service", serviceName: "Print Procurement", title: "Print Procurement & Quote Comparison | Workshop Creative Group", description: "Compare print pricing, production options, and sourcing for business print jobs. Upload a current invoice and explore potential savings of up to 20%." },
  "/gallery": { path: "/gallery", pageType: "collection", title: "Print, Design & Branding Portfolio | Workshop Creative Group", description: "Browse Workshop Creative Group’s portfolio of large format printing, graphic design, branding, and print procurement projects for clients nationwide." },
  "/request-quote": { path: "/request-quote", pageType: "contact", title: "Request a Print Quote Comparison | Workshop Creative Group", description: "Upload your current print invoice and request a comparable quote from Workshop Creative Group. Discover potential savings of up to 20% on your print job." },
  "/contact": { path: "/contact", pageType: "contact", title: "Contact Workshop Creative Group | Nationwide Print Brokerage", description: "Contact Workshop Creative Group to discuss large format printing, graphic design, or print procurement for your business anywhere in the United States." },
  "/privacy": { path: "/privacy", pageType: "website", title: "Privacy Policy | Workshop Creative Group", description: "Read the Workshop Creative Group Privacy Policy, including how quote requests, contact submissions, and uploaded files are handled." },
  "/terms": { path: "/terms", pageType: "website", title: "Terms and Conditions | Workshop Creative Group", description: "Read the terms and conditions governing use of the Workshop Creative Group website and service inquiries." },
  "/blog": { path: "/blog", pageType: "collection", title: "Print Procurement Insights | Workshop Creative Group", description: "Read practical insights from Workshop Creative Group on print sourcing, project planning, graphic design, and business print procurement." },
};

export function getRouteMetadata(pathname: string): RouteMetadata {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return ROUTE_METADATA[normalized] ?? ROUTE_METADATA["/"];
}
