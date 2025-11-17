import { z } from "zod";
import { termSheetSchema } from "./termSheetSchema";

/**
 * Derived Authority Schema
 * Used for NZTR filings, Racing Manager confirmations,
 * trainer acknowledgements, and internal governance.
 */

export const authoritySchema = termSheetSchema.pick({
  racingManager: true,
  racingManagerApprovesSyndication: true,
  trainerConfirmsHorseDetails: true,
});

export type AuthorityDetails = z.infer<typeof authoritySchema>;
