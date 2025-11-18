import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/lib/supabase.types";

// Use generated types - will update to syndicators once migration is run
export type SyndicatorRow = Database["public"]["Tables"]["syndicators"]["Row"];
export type SyndicatorInsert = Database["public"]["Tables"]["syndicators"]["Insert"];
export type SyndicatorUpdate = Database["public"]["Tables"]["syndicators"]["Update"];

export async function createSyndicator(input: {
  name: string;
  contactPerson: string;
  email: string;
  phone?: string;
  syndicatorConfirmsRightToLease: boolean;
  syndicatorApprovesDigitalSyndication: boolean;
}): Promise<SyndicatorRow> {
  const insertData: SyndicatorInsert = {
    name: input.name,
    contact_person: input.contactPerson,
    email: input.email,
    phone: input.phone ?? null,
    syndicator_confirms_right_to_lease: input.syndicatorConfirmsRightToLease,
    syndicator_approves_digital_syndication: input.syndicatorApprovesDigitalSyndication,
  };

  const { data, error } = await supabase
    .from("syndicators")
    .insert(insertData)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`createSyndicator failed: ${error?.message ?? "no data"}`);
  }

  return data;
}

export async function getSyndicatorById(id: string): Promise<SyndicatorRow | null> {
  const { data, error } = await supabase
    .from("syndicators")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    // not "row not found"
    throw new Error(`getSyndicatorById failed: ${error.message}`);
  }

  return data ?? null;
}

export async function listSyndicators(): Promise<SyndicatorRow[]> {
  const { data, error } = await supabase
    .from("syndicators")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`listSyndicators failed: ${error.message}`);
  return data ?? [];
}
