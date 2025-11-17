import { listOwners } from "@/services/owners";
import Link from "next/link";

export default async function AdminSyndicatorsPage() {
  const syndicators = await listOwners();

  return (
    <div className="max-w-4xl mx-auto py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Syndicators</h1>
        <Link
          href="/engine/owners/profile/create"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + New Syndicator
        </Link>
      </div>

      {syndicators.length === 0 && (
        <p className="text-gray-500">No syndicators registered yet.</p>
      )}

      <div className="grid gap-4">
        {syndicators.map((syndicator) => (
          <Link
            key={syndicator.id}
            href={`/admin/syndicators/${syndicator.id}`}
            className="border p-6 rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">{syndicator.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Contact:</strong> {syndicator.contact_person}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {syndicator.email}
                </p>
                {syndicator.phone && (
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {syndicator.phone}
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(syndicator.created_at || "").toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
