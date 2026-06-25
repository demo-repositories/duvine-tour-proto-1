export function getPresentationPreviewPath({
  documentType,
  slug,
}: {
  documentType?: string;
  slug?: string | { current?: string | null } | null;
}) {
  const slugValue = typeof slug === "string" ? slug : slug?.current;

  if (!slugValue) {
    return;
  }

  const cleanSlug = slugValue.replace(/^\/+/, "");
  if (!cleanSlug) {
    return;
  }

  if (documentType === "tour") {
    return `/tours/${cleanSlug.replace(/^tours?\//, "")}`;
  }

  if (documentType === "blog") {
    return cleanSlug.startsWith("blog/")
      ? `/${cleanSlug}`
      : `/blog/${cleanSlug}`;
  }

  return slugValue.startsWith("/") ? slugValue : `/${cleanSlug}`;
}

export function getPresentationToolPath(previewPath?: string) {
  if (!previewPath) {
    return;
  }

  return `/presentation?preview=${encodeURIComponent(previewPath)}`;
}
