import "server-only";

import { stegaClean } from "next-sanity";

import { getJsonLdSettings } from "@/lib/json-ld-data";

import { OrganizationJsonLd, WebSiteJsonLd } from "./json-ld";

type CombinedJsonLdProps = {
  includeWebsite?: boolean;
  includeOrganization?: boolean;
};

export async function CombinedJsonLd({
  includeWebsite = false,
  includeOrganization = false,
}: CombinedJsonLdProps) {
  const res = await getJsonLdSettings();
  const cleanSettings = stegaClean(res);

  return (
    <>
      {includeWebsite && cleanSettings && (
        <WebSiteJsonLd settings={cleanSettings} />
      )}
      {includeOrganization && cleanSettings && (
        <OrganizationJsonLd settings={cleanSettings} />
      )}
    </>
  );
}
