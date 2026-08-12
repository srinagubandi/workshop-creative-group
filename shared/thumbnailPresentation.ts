export type ThumbnailMediaType = "image" | "video";

/** A selected image poster is explicit; null preserves the media's own source behavior. */
export function getPublicThumbnailSource(thumbnailMediaId: number | null | undefined): string | null {
  return thumbnailMediaId ? `/media/${thumbnailMediaId}` : null;
}

export function getThumbnailResetLabel(mediaType: ThumbnailMediaType): string {
  return mediaType === "video" ? "Use first frame from video source" : "Use source image";
}

export function getGalleryPreviewKind(mediaType: ThumbnailMediaType, thumbnailSrc: string | null | undefined): "image" | "video-source-frame" {
  return mediaType === "video" && !thumbnailSrc ? "video-source-frame" : "image";
}
