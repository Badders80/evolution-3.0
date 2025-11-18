import { z } from "zod";

/**
 * Derived Owner Schema
 * Captures all owner-specific fields required for:
 * - NZTR declarations (SR16)
 * - Digital-syndication approval
 * - Owner onboarding
 */

export const ownerSchema = z.object({
  ownerName: z.string().nullable().optional(),
  ownerEmail: z.string().nullable().optional(),
  ownerPhone: z.string().nullable().optional(),
  ownerConfirmsRightToLease: z.boolean().nullable().optional(),
  ownerApprovesDigitalSyndication: z.boolean().nullable().optional(),
});

export type OwnerDetails = z.infer<typeof ownerSchema>;
