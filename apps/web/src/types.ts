import type { FilterByType, Get } from "@sanity/codegen";
import type { SanityImageData } from "@workspace/sanity/image";
import type {
  QueryBlogIndexPageBlogsResult,
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

export type SanityTextChild = {
  marks?: string[];
  text?: string;
  _type: "span";
  _key: string;
};

export type SanityPortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children?: SanityTextChild[];
  [key: string]: unknown;
};

export type SanityRichTextBlock =
  | SanityPortableTextBlock
  | {
      _type: string;
      _key?: string;
      [key: string]: unknown;
    };

export type SanityRichTextProps = SanityRichTextBlock[] | null | undefined;

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
