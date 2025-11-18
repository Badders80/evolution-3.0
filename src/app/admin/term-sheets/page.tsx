import { supabaseServer } from "@/lib/supabaseServer";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminTermSheetsPage() {
  const { data: termSheets } = await supabaseServer
    .from('term_sheets')
    .select('*')
    .order('created_at', { ascending: false });

  // Preload syndicator + horse names
  const enriched = await Promise.all(
    (termSheets || []).map(async (ts) => {
      const [syndicatorResult, horseResult] = await Promise.all([
        supabaseServer
          .from('syndicators')
          .select('name')
          .eq('id', ts.syndicator_id)
          .single(),
        supabaseServer.from('horses').select('horse_name').eq('id', ts.horse_id).single(),
      ]);

      return {
        ...ts,
        syndicatorName: syndicatorResult.data?.name ?? "Unknown Syndicator",
        horseName: horseResult.data?.horse_name ?? "Unknown Horse",
      };
    })
  );

  return (
    <div className="max-w-4xl mx-auto py-8 pt-24">
      <h1 className="text-2xl mb-6 font-medium">Term Sheets</h1>

      {enriched.length === 0 && (
        <p className="text-gray-500">No term sheets created yet.</p>
      )}

      <ul className="space-y-3">
        {enriched.map((ts) => (
          <li
            key={ts.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{ts.syndicate_name}</p>
              <p className="text-sm text-gray-600">
                Horse: {ts.horseName}
              </p>
              <p className="text-sm text-gray-600">
                Syndicator: {ts.syndicatorName}
              </p>
            </div>

            <a
              href={`/admin/term-sheets/${ts.id}`}
              className="text-sm underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
