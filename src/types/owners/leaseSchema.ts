import { z } from "zod";

/**
 * Derived Lease Schema
 * Focused on all economic, time-based, and tokenisation
 * details required by Tokinvest issuance and Evolution Stables.
 */

export const leaseSchema = z.object({
  syndicateName: z.string().nullable().optional(),
  leaseType: z.string().nullable().optional(),
  leaseStart: z.string().nullable().optional(),
  leaseEnd: z.string().nullable().optional(),
  leaseDurationMonths: z.number().nullable().optional(),
  minimumTokenSize: z.number().nullable().optional(),
  numberOfTokensAvailable: z.number().nullable().optional(),
  leasePricePerOnePercent: z.number().nullable().optional(),
  tokenHolderRevenueSharePercent: z.number().nullable().optional(),
  tokinvestPlatformFeePercent: z.number().nullable().optional(),
  evolutionFeePercent: z.number().nullable().optional(),
  tokenSymbol: z.string().nullable().optional(),
  tokenNetwork: z.string().nullable().optional(),
  custodian: z.string().nullable().optional(),
  tokenMintAuthority: z.string().nullable().optional(),
  tokenTransferRestrictions: z.string().nullable().optional(),
});

export type LeaseDetails = z.infer<typeof leaseSchema>;
