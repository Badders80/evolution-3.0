import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.includes('loveracing.nz')) {
      return NextResponse.json(
        { error: 'Please provide a valid LoveRacing.nz URL' },
        { status: 400 }
      );
    }

    // Fetch the page
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch horse details from LoveRacing' },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract horse data (you'll need to adjust selectors based on actual HTML)
    const horseName = $('h2').first().text().trim() || 'Unknown Horse';
    
    // Extract data from the page
    const pageText = $.text();
    
    // Parse microchip
    const microchipMatch = pageText.match(/Microchip:\s*(\d+)/);
    const microchip = microchipMatch ? microchipMatch[1] : null;
    
    // Parse life number
    const lifeNoMatch = pageText.match(/Life no:\s*([A-Z0-9]+)/);
    const lifeNumber = lifeNoMatch ? lifeNoMatch[1] : null;
    
    // Parse sex (Gelding, Mare, Stallion, etc)
    const sexMatch = pageText.match(/(Gelding|Mare|Stallion|Colt|Filly)/i);
    const sex = sexMatch ? sexMatch[1] : null;
    
    // Parse trainer
    const trainerMatch = pageText.match(/Trainer:\s*([^\n\/]+)/);
    const trainerName = trainerMatch ? trainerMatch[1].trim() : null;
    
    // Parse training location
    const trainingMatch = pageText.match(/Training Location:\s*([^\n]+)/);
    const trainingLocation = trainingMatch ? trainingMatch[1].trim() : null;

    if (!microchip || !lifeNumber) {
      return NextResponse.json(
        { error: 'Could not extract required horse information from the page' },
        { status: 400 }
      );
    }

    // Insert horse into database
    const { data: horse, error: insertError } = await supabaseServer
      .from('horses')
      .insert({
        horse_name: horseName,
        microchip_number: microchip,
        life_number: lifeNumber,
        sex: sex,
        training_location: trainingLocation,
        property_name: 'Evolution Stables',
        horse_owner_name: 'To be updated',
        trainer_id: null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: `Failed to register horse: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      horseId: horse.id,
      horseName: horse.horse_name,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
