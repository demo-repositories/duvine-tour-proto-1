/**
 * Schema types for the DuVine demo Studio.
 *
 * Register these in apps/studio/sanity.config.ts by extending the existing schemaTypes array:
 *
 *   import {duvineSchemaTypes} from './schemaTypes/duvine'
 *   ...
 *   schema: {types: [...existingTypes, ...duvineSchemaTypes]}
 *
 * Or add them to the starter's apps/studio/schemaTypes/index.ts if that's how it aggregates.
 */
import { tourType } from "./documents/tour";
import { bikeType } from "./documents/bike";
import { departureScheduleType } from "./documents/departureSchedule";
import { itineraryDayType } from "./objects/itineraryDay";
import { highlightBlockType } from "./objects/highlightBlock";
import { detailSectionType } from "./objects/detailSection";

export const duvineSchemaTypes = [
  // documents
  tourType,
  bikeType,
  departureScheduleType,
  // objects
  itineraryDayType,
  highlightBlockType,
  detailSectionType,
];
