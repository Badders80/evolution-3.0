import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";
import FavoriteStar from "@/components/FavoriteStar";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminSyndicatorsPage() {
  const { data: syndicators } = await supabaseServer
    .from('syndicators')
    .select('*')
    .order('name', { ascending: true });

  // Sort favorites to top in-memory since column may not exist yet
  const sortedSyndicators = syndicators?.sort((a, b) => {
    const aFav = a.is_favorite ?? false;
    const bFav = b.is_favorite ?? false;
    if (aFav === bFav) return 0;
    return bFav ? 1 : -1;
  }) || [];

  return (
    <div className="max-w-4xl mx-auto py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Syndicators</h1>
        <Link
          href="/engine/syndicators/profile/create"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + New Syndicator
        </Link>
      </div>

      {(!syndicators || syndicators.length === 0) && (
        <p className="text-gray-500">No syndicators registered yet.</p>
      )}

      <div className="grid gap-4">
        {sortedSyndicators?.map((syndicator) => (
          <Link
            key={syndicator.id}
            href={`/admin/syndicators/${syndicator.id}`}
            className="border p-6 rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-medium">{syndicator.name}</h2>
                  {syndicator.is_favorite && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Favorite
                    </span>
                  )}
                </div>
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
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  {new Date(syndicator.created_at || "").toLocaleDateString()}
                </div>
                <FavoriteStar 
                  syndicatorId={syndicator.id} 
                  initialIsFavorite={syndicator.is_favorite || false}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
