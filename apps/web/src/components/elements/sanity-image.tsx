"use client";
import {
  processImageData,
  SANITY_BASE_URL,
  type SanityImageProps,
} from "@workspace/sanity/image";
import type { ElementType } from "react";
import {
  SanityImage as BaseSanityImage,
  buildSrc,
  buildSrcSet,
  type WrapperProps,
} from "sanity-image";

// Image wrapper component
const ImageWrapper = <T extends ElementType = "img">(
  props: WrapperProps<T>
) => <BaseSanityImage baseUrl={SANITY_BASE_URL} {...props} />;

type AppSanityImageProps = SanityImageProps & {
  readonly maxSrcSetWidth?: number;
};

function getCandidateWidth(candidate: string) {
  const match = candidate.match(/\s(\d+)w$/);
  const width = match?.[1];
  return width ? Number.parseInt(width, 10) : undefined;
}

// Main component
export function SanityImage({
  image,
  maxSrcSetWidth,
  ...props
}: AppSanityImageProps) {
  const processedImageData = processImageData(image);

  // Early return for invalid image data
  if (!processedImageData) {
    return null;
  }

  if (maxSrcSetWidth) {
    const {
      as: _as,
      crop: _crop,
      height,
      hotspot: _hotspot,
      htmlHeight,
      htmlId,
      htmlWidth,
      mode,
      preview: _preview,
      queryParams,
      width,
      ...imageElementProps
    } = props;
    const imageQueryInputs = {
      baseUrl: SANITY_BASE_URL,
      crop: processedImageData.crop,
      height,
      hotspot: processedImageData.hotspot,
      id: processedImageData.id,
      mode,
      queryParams,
      width,
    };
    const {
      src,
      height: outputHeight,
      width: outputWidth,
    } = buildSrc(imageQueryInputs);
    const srcSet = buildSrcSet(imageQueryInputs).filter((candidate) => {
      const candidateWidth = getCandidateWidth(candidate);
      return !candidateWidth || candidateWidth <= maxSrcSetWidth;
    });

    return (
      // biome-ignore lint/performance/noImgElement: this keeps the existing Sanity image URL behavior while capping srcset widths.
      <img
        {...imageElementProps}
        alt={processedImageData.alt}
        height={htmlHeight ?? outputHeight}
        id={htmlId}
        loading={imageElementProps.loading ?? "lazy"}
        src={src}
        srcSet={srcSet.join(", ")}
        width={htmlWidth ?? outputWidth}
      />
    );
  }

  return <ImageWrapper {...props} {...processedImageData} />;
}
