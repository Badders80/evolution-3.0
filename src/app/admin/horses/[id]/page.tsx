import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminHorseDetailPage({ params }: Props) {
  const { id } = await params;

  const { data: horse } = await supabaseServer
    .from('horses')
    .select('*')
    .eq('id', id)
    .single();

  if (!horse) {
    return (
      <div className="max-w-3xl mx-auto py-8 pt-24">
        <p className="text-red-500">Horse not found.</p>
      </div>
    );
  }

  // Get all term sheets for this horse
  const { data: horseTermSheetsRaw } = await supabaseServer
    .from('term_sheets')
    .select('*')
    .eq('horse_id', id)
    .order('created_at', { ascending: false });

  const horseTermSheets = horseTermSheetsRaw ?? [];

  return (
    <div className="max-w-3xl mx-auto py-8 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Horse Details</h1>
        <Link
          href="/admin/horses"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to List
        </Link>
      </div>

      {/* Horse Info */}
      <section className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-lg">Profile</h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {horse.horse_name}
          </p>
          <p>
            <strong>Microchip Number:</strong> {horse.microchip_number}
          </p>
          <p>
            <strong>Life Number:</strong> {horse.life_number}
          </p>
          <p>
            <strong>Sex:</strong> {horse.sex}
          </p>
          {horse.height_hands && (
            <p>
              <strong>Height:</strong> {horse.height_hands} hands
            </p>
          )}
          {horse.training_location && (
            <p>
              <strong>Training Location:</strong> {horse.training_location}
            </p>
          )}
          {horse.property_name && (
            <p>
              <strong>Property:</strong> {horse.property_name}
            </p>
          )}
          {horse.horse_owner_name && (
            <p>
              <strong>Registered Owner:</strong> {horse.horse_owner_name}
            </p>
          )}
          <p className="text-sm text-gray-500 pt-2">
            Created: {new Date(horse.created_at || "").toLocaleString()}
          </p>
        </div>
      </section>

      {/* Term Sheets */}
      <section className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-lg">
          Term Sheets ({horseTermSheets.length})
        </h2>
        {horseTermSheets.length === 0 ? (
          <p className="text-gray-500">No term sheets yet.</p>
        ) : (
          <div className="space-y-3">
            {horseTermSheets.map((ts) => (
              <Link
                key={ts.id}
                href={`/admin/term-sheets/${ts.id}`}
                className="block border p-4 rounded hover:border-gray-400 transition-colors"
              >
                <p className="font-medium">{ts.syndicate_name}</p>
                <p className="text-sm text-gray-600">
                  Lease: {ts.lease_start} to {ts.lease_end}
                </p>
                <p className="text-sm text-gray-600">
                  {ts.number_of_tokens_available} tokens available
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
