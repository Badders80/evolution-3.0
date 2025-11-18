import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminHorsesPage() {
  const { data: horses } = await supabaseServer
    .from('horses')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Horses</h1>
        <p className="text-sm text-gray-600">
          Horses are created during the syndication flow
        </p>
      </div>

      {(!horses || horses.length === 0) && (
        <p className="text-gray-500">No horses registered yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {horses?.map((horse) => (
          <Link
            key={horse.id}
            href={`/admin/horses/${horse.id}`}
            className="border p-6 rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium mb-2">{horse.horse_name}</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Microchip:</strong> {horse.microchip_number}
                  </p>
                  <p>
                    <strong>Life #:</strong> {horse.life_number}
                  </p>
                  <p>
                    <strong>Sex:</strong> {horse.sex}
                  </p>
                  {horse.training_location && (
                    <p>
                      <strong>Training:</strong> {horse.training_location}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(horse.created_at || "").toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
