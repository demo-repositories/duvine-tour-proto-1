import { EarthGlobeIcon } from "@sanity/icons";
import { Button, Card, Flex, Stack, Text, useToast } from "@sanity/ui";
import type { HTMLAttributes } from "react";
import { useCallback, useMemo } from "react";
import { type SanityDocument, type SlugValue, useFormValue } from "sanity";
import { useRouter } from "sanity/router";

import {
  getPresentationPreviewPath,
  getPresentationToolPath,
} from "@/utils/presentation-preview";

type TourPreviewInputProps = {
  elementProps: HTMLAttributes<HTMLDivElement>;
};

export function TourPresentationLinkInput({
  elementProps,
}: TourPreviewInputProps) {
  const document = useFormValue([]) as (SanityDocument & {
    slug?: SlugValue;
  }) | null;
  const router = useRouter();
  const toast = useToast();
  const slug = document?.slug?.current;

  const previewPath = useMemo(
    () => getPresentationPreviewPath({ documentType: "tour", slug }),
    [slug]
  );
  const presentationPath = useMemo(
    () => getPresentationToolPath(previewPath),
    [previewPath]
  );

  const handleOpen = useCallback(() => {
    if (!presentationPath) {
      toast.push({
        status: "error",
        title: "Add a slug first",
        description: "This tour needs a URL slug before it can open in Preview.",
      });
      return;
    }

    router.navigateUrl({ path: presentationPath });
  }, [presentationPath, router, toast]);

  return (
    <div {...elementProps}>
      <Card border padding={3} radius={2} tone="primary">
        <Flex align="center" gap={3} justify="space-between">
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Presentation preview
            </Text>
            <Text size={1}>
              {previewPath ?? "Add a URL slug to enable the tour preview."}
            </Text>
          </Stack>
          <Button
            disabled={!presentationPath}
            icon={EarthGlobeIcon}
            mode="default"
            onClick={handleOpen}
            text="Open"
            tone="primary"
          />
        </Flex>
      </Card>
    </div>
  );
}
