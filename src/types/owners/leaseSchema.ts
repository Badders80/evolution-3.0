import { z } from "zod";
import { termSheetSchema } from "./termSheetSchema";

/**
 * Derived Lease Schema
 * Focused on all economic, time-based, and tokenisation
 * details required by Tokinvest issuance and Evolution Stables.
 */

export const leaseSchema = termSheetSchema.pick({
  syndicateName: true,
  leaseType: true,
  leaseStart: true,
  leaseEnd: true,
  leaseDurationMonths: true,
  minimumTokenSize: true,
  numberOfTokensAvailable: true,
  leasePricePerOnePercent: true,
  tokenHolderRevenueSharePercent: true,
  tokinvestPlatformFeePercent: true,
  evolutionFeePercent: true,
  tokenSymbol: true,
  tokenNetwork: true,
  custodian: true,
  tokenMintAuthority: true,
  tokenTransferRestrictions: true,
});

export type LeaseDetails = z.infer<typeof leaseSchema>;
