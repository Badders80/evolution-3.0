import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/lib/supabase.types";

// Use generated types
export type TermSheetRow = Database["public"]["Tables"]["term_sheets"]["Row"];
export type TermSheetInsert = Database["public"]["Tables"]["term_sheets"]["Insert"];
export type TermSheetUpdate = Database["public"]["Tables"]["term_sheets"]["Update"];

export async function createTermSheet(input: {
  ownerId: string;
  horseId: string;

  syndicateName: string;
  leaseType: string;
  leaseStart: string; // ISO date
  leaseEnd: string;   // ISO date
  leaseDurationMonths: number;
  minimumTokenSize: number;
  numberOfTokensAvailable: number;
  leasePricePerOnePercent: number;
  tokenHolderRevenueSharePercent: number;
  tokinvestPlatformFeePercent: number;
  evolutionFeePercent: number;

  tokenSymbol: string;
  tokenNetwork: string;
  custodian: string;
  tokenMintAuthority: string;
  tokenTransferRestrictions: string;

  racingManagerId?: string;
  racingManagerApprovesSyndication: boolean;
  trainerConfirmsHorseDetails: boolean;
}): Promise<TermSheetRow> {
  const insertData: TermSheetInsert = {
    owner_id: input.ownerId,
    horse_id: input.horseId,
    syndicate_name: input.syndicateName,
    lease_type: input.leaseType,
    lease_start: input.leaseStart,
    lease_end: input.leaseEnd,
    lease_duration_months: input.leaseDurationMonths,
    minimum_token_size: input.minimumTokenSize,
    number_of_tokens_available: input.numberOfTokensAvailable,
    lease_price_per_one_percent: input.leasePricePerOnePercent,
    token_holder_revenue_share_percent: input.tokenHolderRevenueSharePercent,
    tokinvest_platform_fee_percent: input.tokinvestPlatformFeePercent,
    evolution_fee_percent: input.evolutionFeePercent,
    token_symbol: input.tokenSymbol,
    token_network: input.tokenNetwork,
    custodian: input.custodian,
    token_mint_authority: input.tokenMintAuthority,
    token_transfer_restrictions: input.tokenTransferRestrictions,
    racing_manager_id: input.racingManagerId ?? null,
    racing_manager_approves_syndication: input.racingManagerApprovesSyndication,
    trainer_confirms_horse_details: input.trainerConfirmsHorseDetails,
  };

  const { data, error } = await supabase
    .from("term_sheets")
    .insert(insertData)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`createTermSheet failed: ${error?.message ?? "no data"}`);
  }

  return data;
}

export async function getTermSheetById(
  id: string,
): Promise<TermSheetRow | null> {
  const { data, error } = await supabase
    .from("term_sheets")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`getTermSheetById failed: ${error.message}`);
  }

  return data ?? null;
}

export async function listTermSheets(): Promise<TermSheetRow[]> {
  const { data, error } = await supabase
    .from("term_sheets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`listTermSheets failed: ${error.message}`);
  return data ?? [];
}
