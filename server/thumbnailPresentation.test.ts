import { describe, expect, it } from "vitest";
import { getGalleryPreviewKind, getPublicThumbnailSource, getThumbnailResetLabel } from "../shared/thumbnailPresentation";

describe("thumbnail presentation safeguards", () => {
  it("uses a selected image as the explicit poster and preserves a null source fallback", () => {
    expect(getPublicThumbnailSource(48)).toBe("/media/48");
    expect(getPublicThumbnailSource(null)).toBeNull();
  });

  it("describes source-image and source-video reset behavior explicitly", () => {
    expect(getThumbnailResetLabel("image")).toBe("Use source image");
    expect(getThumbnailResetLabel("video")).toBe("Use first frame from video source");
  });

  it("renders a video source frame by default and an image after a poster is selected", () => {
    expect(getGalleryPreviewKind("video", null)).toBe("video-source-frame");
    expect(getGalleryPreviewKind("video", "/media/148")).toBe("image");
  });
});
