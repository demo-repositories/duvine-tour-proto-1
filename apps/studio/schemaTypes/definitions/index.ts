import { defineType } from "sanity";

import { button } from "@/schemaTypes/definitions/button";
import { customUrl } from "@/schemaTypes/definitions/custom-url";
import { pageBuilder } from "@/schemaTypes/definitions/pagebuilder";
import { richText } from "@/schemaTypes/definitions/rich-text";

export const lucideIcon = defineType({
  name: "lucide-icon",
  title: "Icon",
  type: "string",
});

export const definitions = [
  customUrl,
  richText,
  button,
  pageBuilder,
  lucideIcon,
];
