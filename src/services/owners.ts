import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/lib/supabase.types";

// Use generated types instead of manual ones
export type OwnerRow = Database["public"]["Tables"]["owners"]["Row"];
export type OwnerInsert = Database["public"]["Tables"]["owners"]["Insert"];
export type OwnerUpdate = Database["public"]["Tables"]["owners"]["Update"];

export async function createOwner(input: {
  name: string;
  contactPerson: string;
  email: string;
  phone?: string;
  ownerConfirmsRightToLease: boolean;
  ownerApprovesDigitalSyndication: boolean;
}): Promise<OwnerRow> {
  const insertData: OwnerInsert = {
    name: input.name,
    contact_person: input.contactPerson,
    email: input.email,
    phone: input.phone ?? null,
    owner_confirms_right_to_lease: input.ownerConfirmsRightToLease,
    owner_approves_digital_syndication: input.ownerApprovesDigitalSyndication,
  };

  const { data, error } = await supabase
    .from("owners")
    .insert(insertData)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`createOwner failed: ${error?.message ?? "no data"}`);
  }

  return data;
}

export async function getOwnerById(id: string): Promise<OwnerRow | null> {
  const { data, error } = await supabase
    .from("owners")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    // not "row not found"
    throw new Error(`getOwnerById failed: ${error.message}`);
  }

  return data ?? null;
}

export async function listOwners(): Promise<OwnerRow[]> {
  const { data, error } = await supabase
    .from("owners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`listOwners failed: ${error.message}`);
  return data ?? [];
}
