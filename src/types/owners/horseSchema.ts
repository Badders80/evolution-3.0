import { z } from "zod";
import { termSheetSchema } from "./termSheetSchema";

/**
 * Derived Horse Schema
 * Extracts only the horse-specific fields required
 * for NZTR forms, PDS display, onboarding forms,
 * and Tokinvest metadata.
 */

export const horseSchema = termSheetSchema.pick({
  horseName: true,
  microchipNumber: true,
  lifeNumber: true,
  sex: true,
  heightHands: true,
  trainerName: true,
  trainingLocation: true,
  horseOwnerName: true,
  propertyName: true,
});

export type HorseDetails = z.infer<typeof horseSchema>;
