import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/lib/supabase.types";

// Use generated types
export type HorseRow = Database["public"]["Tables"]["horses"]["Row"];
export type HorseInsert = Database["public"]["Tables"]["horses"]["Insert"];
export type HorseUpdate = Database["public"]["Tables"]["horses"]["Update"];

export async function createHorse(input: {
  horseName: string;
  microchipNumber: string;
  lifeNumber: string;
  sex: string;
  heightHands?: string;
  trainingLocation?: string;
  propertyName?: string;
  horseSyndicatorName?: string;
  trainerId?: string;
}): Promise<HorseRow> {
  const insertData: HorseInsert = {
    horse_name: input.horseName,
    microchip_number: input.microchipNumber,
    life_number: input.lifeNumber,
    sex: input.sex,
    height_hands: input.heightHands ?? null,
    training_location: input.trainingLocation ?? null,
    property_name: input.propertyName ?? null,
    horse_owner_name: input.horseSyndicatorName ?? null,
    trainer_id: input.trainerId ?? null,
  };

  const { data, error } = await supabase
    .from("horses")
    .insert(insertData)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`createHorse failed: ${error?.message ?? "no data"}`);
  }

  return data;
}

export async function getHorseById(id: string): Promise<HorseRow | null> {
  const { data, error } = await supabase
    .from("horses")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`getHorseById failed: ${error.message}`);
  }

  return data ?? null;
}

export async function listHorses(): Promise<HorseRow[]> {
  const { data, error } = await supabase
    .from("horses")
    .select("*")
    .order("created_at", { ascending: false});

  if (error) throw new Error(`listHorses failed: ${error.message}`);
  return data ?? [];
}
