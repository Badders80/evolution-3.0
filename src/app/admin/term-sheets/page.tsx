import { listTermSheets } from "@/services/termSheets";
import { getOwnerById } from "@/services/owners";
import { getHorseById } from "@/services/horses";

export default async function AdminTermSheetsPage() {
  const termSheets = await listTermSheets();

  // Preload owner + horse names
  const enriched = await Promise.all(
    termSheets.map(async (ts) => {
      const owner = await getOwnerById(ts.owner_id);
      const horse = await getHorseById(ts.horse_id);

      return {
        ...ts,
        ownerName: owner?.name ?? "Unknown Syndicator",
        horseName: horse?.horse_name ?? "Unknown Horse",
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
                Syndicator: {ts.ownerName}
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
