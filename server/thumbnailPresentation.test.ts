import { describe, expect, it } from "vitest";
import { getPublicThumbnailSource, getThumbnailResetLabel } from "../shared/thumbnailPresentation";

describe("thumbnail presentation safeguards", () => {
  it("uses a selected image as the explicit poster and preserves a null source fallback", () => {
    expect(getPublicThumbnailSource(48)).toBe("/media/48");
    expect(getPublicThumbnailSource(null)).toBeNull();
  });

  it("describes source-image and source-video reset behavior explicitly", () => {
    expect(getThumbnailResetLabel("image")).toBe("Use source image");
    expect(getThumbnailResetLabel("video")).toBe("Use first frame from video source");
  });
});
