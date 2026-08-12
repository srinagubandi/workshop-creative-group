import { describe, expect, it } from "vitest";
import { createStorageKey } from "./storage";

describe("Railway bucket storage keys", () => {
  it("creates a date-partitioned key and sanitizes unsafe filenames", () => {
    const key = createStorageKey("managed-media/images", "Client report ../ final?.png");
    expect(key).toMatch(/^managed-media\/images\/\d{4}-\d{2}-\d{2}\/[0-9a-f-]+-Client-report-..-final-.png$/);
    expect(key).not.toContain("?");
  });

  it("creates unique object keys for identical source names", () => {
    expect(createStorageKey("invoices", "invoice.pdf")).not.toEqual(createStorageKey("invoices", "invoice.pdf"));
  });
});
