import { z } from "zod";

/**
 * Derived Horse Schema
 * Extracts only the horse-specific fields required
 * for NZTR forms, PDS display, onboarding forms,
 * and Tokinvest metadata.
 */

export const horseSchema = z.object({
  horseName: z.string().nullable().optional(),
  microchipNumber: z.string().nullable().optional(),
  lifeNumber: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  heightHands: z.string().nullable().optional(),
  trainerName: z.string().nullable().optional(),
  trainingLocation: z.string().nullable().optional(),
  horseOwnerName: z.string().nullable().optional(),
  propertyName: z.string().nullable().optional(),
});

export type HorseDetails = z.infer<typeof horseSchema>;
