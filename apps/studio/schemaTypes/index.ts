import { duvineSchemaTypes } from "@/schemaTypes/duvine";
import { pageBuilderBlocks } from "@/schemaTypes/blocks/index";
import { definitions } from "@/schemaTypes/definitions/index";
import { documents, singletons } from "@/schemaTypes/documents/index";

export const schemaTypes = [
  ...documents,
  ...definitions,
  ...pageBuilderBlocks,
  ...duvineSchemaTypes,
];

export const schemaNames = [...documents].map((doc) => doc.name);

export type SchemaType = (typeof schemaNames)[number];

export const singletonType = singletons.map(({ name }) => name);

export type SingletonType = (typeof singletonType)[number];

export default schemaTypes;
