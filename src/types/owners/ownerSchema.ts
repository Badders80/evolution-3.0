import { z } from "zod";
import { termSheetSchema } from "./termSheetSchema";

/**
 * Derived Owner Schema
 * Captures all owner-specific fields required for:
 * - NZTR declarations (SR16)
 * - Digital-syndication approval
 * - Owner onboarding
 */

export const ownerSchema = termSheetSchema.pick({
  ownerName: true,
  ownerEmail: true,
  ownerPhone: true,
  ownerConfirmsRightToLease: true,
  ownerApprovesDigitalSyndication: true,
});

export type OwnerDetails = z.infer<typeof ownerSchema>;
