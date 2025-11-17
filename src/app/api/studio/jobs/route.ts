import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || 'http://localhost:8080';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('user_id') as string;
    const sourceUrl = formData.get('source_url') as string | null;
    const trainerLogoUrl = formData.get('trainer_logo_url') as string | null;

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    let jobPayload: any = {
      user_id: userId,
    };

    // Handle direct file upload
    if (file) {
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json(
          { error: 'Supabase configuration missing' },
          { status: 500 }
        );
      }

      // Upload file to Supabase Storage
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `studio-uploads/${userId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('studio-files')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload file', details: uploadError.message },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('studio-files')
        .getPublicUrl(filePath);

      jobPayload.supabase_file_id = filePath;
    }

    // Handle miStable URL workflow
    if (sourceUrl) {
      jobPayload.source_url = sourceUrl;
      if (trainerLogoUrl) {
        jobPayload.trainer_logo_url = trainerLogoUrl;
      }
    }

    // Call orchestrator
    const orchestratorResponse = await fetch(`${ORCHESTRATOR_URL}/v1/jobs/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobPayload),
    });

    if (!orchestratorResponse.ok) {
      const errorData = await orchestratorResponse.json();
      return NextResponse.json(
        { error: 'Orchestrator error', details: errorData },
        { status: orchestratorResponse.status }
      );
    }

    const jobData = await orchestratorResponse.json();
    return NextResponse.json(jobData, { status: 201 });
  } catch (error: any) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

