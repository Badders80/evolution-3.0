import { z } from "zod";

/**
 * Minimal Term Sheet schema for authority-related fields.
 * This mirrors just the fields needed by authoritySchema.
 */
export const termSheetSchema = z.object({
  racingManager: z.string().nullable().optional(),
  racingManagerApprovesSyndication: z.boolean().nullable().optional(),
  trainerConfirmsHorseDetails: z.boolean().nullable().optional(),
});

export type TermSheet = z.infer<typeof termSheetSchema>;
