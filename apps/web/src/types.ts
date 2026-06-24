import type { FilterByType, Get } from "@sanity/codegen";
import type { SanityImageData } from "@workspace/sanity/image";
import type {
  QueryBlogIndexPageBlogsResult,
  QueryBlogSlugPageDataResult,
  QueryGlobalSeoSettingsResult,
  QueryHomePageDataResult,
  QueryNavbarDataResult,
} from "@workspace/sanity/types";

export type PageBuilderBlock = Get<
  QueryHomePageDataResult,
  "pageBuilder",
  number
>;

export type PageBuilderBlockTypes = NonNullable<PageBuilderBlock>["_type"];

export type PagebuilderType<T extends PageBuilderBlockTypes> = FilterByType<
  NonNullable<PageBuilderBlock>,
  T
>;

export type SanityButtonProps = Get<PagebuilderType<"hero">, "buttons", number>;

export type SanityImageProps = SanityImageData;

export type SanityRichTextProps = Get<QueryBlogSlugPageDataResult, "richText">;

export type SanityRichTextBlock = FilterByType<
  NonNullable<NonNullable<SanityRichTextProps>[number]>,
  "block"
>;

export type Blog = Get<QueryBlogIndexPageBlogsResult, number>;

export type Maybe<T> = T | null | undefined;

// Navigation types
export type NavigationData = {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
};

export type NavColumn = Get<QueryNavbarDataResult, "columns", number>;

export type ColumnLink =
  Extract<NavColumn, { type: "column" }>["links"] extends Array<infer T>
    ? T
    : never;

export type MenuLinkProps = {
  name: string;
  href: string;
  description?: string;
  icon?: string | null;
  onClick?: () => void;
};
