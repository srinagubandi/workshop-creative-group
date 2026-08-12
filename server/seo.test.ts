import { describe, expect, it } from "vitest";
import { injectSeoMetadata } from "./seo";
import { ROUTE_METADATA, getRouteMetadata } from "../shared/seo";

const template = `<!doctype html><html><head><title>Fallback</title><meta name="description" content="Fallback" /><!-- SEO_DYNAMIC_METADATA --></head><body></body></html>`;

describe("nationwide route metadata", () => {
  it("provides unique, descriptive metadata for every public priority route", () => {
    const values = Object.values(ROUTE_METADATA);
    expect(values).toHaveLength(9);
    expect(new Set(values.map(value => value.title)).size).toBe(values.length);
    expect(values.every(value => value.description.length > 80)).toBe(true);
    expect(getRouteMetadata("/missing")).toEqual(ROUTE_METADATA["/"]);
  });

  it("injects canonical, sharing metadata, and accurate structured data for a service route", () => {
    const html = injectSeoMetadata(template, "/print-procurement");
    expect(html).toContain("Print Procurement &amp; Quote Comparison");
    expect(html).toContain('rel="canonical" href="https://www.workshopcreativegroup.com/print-procurement"');
    expect(html).toContain('property="og:url" content="https://www.workshopcreativegroup.com/print-procurement"');
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"areaServed":{"@type":"Country","name":"United States"}');
    expect(html).not.toContain("SEO_DYNAMIC_METADATA");
  });
});
