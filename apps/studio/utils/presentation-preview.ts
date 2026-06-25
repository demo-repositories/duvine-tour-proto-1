export function getPresentationPreviewPath({
  documentType,
  slug,
}: {
  documentType: string;
  slug?: string;
}) {
  if (!slug) {
    return;
  }

  const cleanSlug = slug.replace(/^\/+/, "");
  if (!cleanSlug) {
    return;
  }

  if (documentType === "tour") {
    return `/tour/${cleanSlug.replace(/^tour\//, "")}`;
  }

  return slug.startsWith("/") ? slug : `/${cleanSlug}`;
}

export function getPresentationToolPath(previewPath?: string) {
  if (!previewPath) {
    return;
  }

  return `/presentation?preview=${encodeURIComponent(previewPath)}`;
}
