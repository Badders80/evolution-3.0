import { supabaseServer } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { syndicatorId, isFavorite } = await request.json();

    if (!syndicatorId) {
      return NextResponse.json(
        { error: 'Syndicator ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('owners')
      .update({ is_favorite: isFavorite })
      .eq('id', syndicatorId)
      .select()
      .single();

    if (error) {
      console.error('Error updating favorite:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in favorite toggle:', error);
    return NextResponse.json(
      { error: 'Failed to update favorite status' },
      { status: 500 }
    );
  }
}
