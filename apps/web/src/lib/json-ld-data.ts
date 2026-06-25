import { sanityFetch } from "@workspace/sanity/live";
import { querySettingsData } from "@workspace/sanity/query";

import { handleErrors } from "@/utils";

export async function getJsonLdSettings() {
  "use cache";
  // sanityFetch (not raw client.fetch) registers Sanity Live tags so settings edits invalidate this.
  const [res] = await handleErrors(
    sanityFetch({
      query: querySettingsData,
      perspective: "published",
      stega: false,
    })
  );
  return res?.data;
}
