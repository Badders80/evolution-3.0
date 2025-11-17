'use client';

import { useState, useEffect } from 'react';
import { useSupabase, useSession } from '@/providers/supabase-provider';

export default function StudioHome() {
  const { supabase } = useSupabase();
  const session = useSession();
  const [step, setStep] = useState<'upload' | 'transcribe' | 'enrich' | 'refine' | 'output'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState('');
  const [enriched, setEnriched] = useState('');
  const [refined, setRefined] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8">Evolution Studios</h1>

      {/* Step Tracker */}
      <div className="flex gap-4 mb-10 text-sm text-neutral-500">
        <Step label="Upload" active={step === 'upload'} />
        <Step label="Transcribe" active={step === 'transcribe'} />
        <Step label="Enrich" active={step === 'enrich'} />
        <Step label="Refine" active={step === 'refine'} />
        <Step label="Output" active={step === 'output'} />
      </div>

      {/* 1. Upload */}
      {step === 'upload' && (
        <UploadPanel
          file={file}
          setFile={setFile}
          userId={session?.user?.id || ''}
          onNext={(newJobId: string) => {
            setJobId(newJobId);
            setStep('transcribe');
          }}
        />
      )}

      {/* 2. Transcribe */}
      {step === 'transcribe' && (
        <TranscriptionPanel
          file={file}
          transcription={transcription}
          setTranscription={setTranscription}
          jobId={jobId}
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          onNext={() => setStep('enrich')}
        />
      )}

      {/* 3. Enrich */}
      {step === 'enrich' && (
        <EnrichmentPanel
          transcription={transcription}
          enriched={enriched}
          setEnriched={setEnriched}
          jobId={jobId}
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          onNext={() => setStep('refine')}
        />
      )}

      {/* 4. Refine */}
      {step === 'refine' && (
        <RefinementPanel
          enriched={enriched}
          refined={refined}
          setRefined={setRefined}
          jobId={jobId}
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          onNext={() => setStep('output')}
        />
      )}

      {/* 5. Output */}
      {step === 'output' && (
        <OutputPanel
          refined={refined}
          onReset={() => {
            setFile(null);
            setTranscription('');
            setEnriched('');
            setRefined('');
            setJobId(null);
            setJobStatus(null);
            setStep('upload');
          }}
        />
      )}
    </div>
  );
}

// ----------------------
// Step Indicator
// ----------------------
function Step({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`pb-1 border-b-2 ${
        active ? 'border-white text-white' : 'border-neutral-700'
      }`}
    >
      {label}
    </div>
  );
}

// ----------------------
// Upload Panel
// ----------------------
function UploadPanel({
  file,
  setFile,
  userId,
  onNext,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
  userId: string;
  onNext: (jobId: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('video/') || droppedFile.type.startsWith('audio/'))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border border-neutral-800 rounded-xl p-8">
      {!file && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-white bg-white/5'
              : 'border-neutral-700 hover:border-neutral-600'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <p className="text-neutral-400 mb-4">
            Drag and drop a video or audio file here
          </p>
          <p className="text-sm text-neutral-500 mb-6">or</p>
          <label className="inline-block px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 cursor-pointer transition-colors">
            Browse Files
            <input
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          <p className="text-xs text-neutral-500 mt-4">
            Supports video and audio files
          </p>
        </div>
      )}

      {file && (
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white font-medium mb-2">{file.name}</p>
                <div className="flex gap-4 text-sm text-neutral-400">
                  <span>Type: {file.type || 'Unknown'}</span>
                  <span>Size: {formatFileSize(file.size)}</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={async () => {
                if (!userId) {
                  setError('User not authenticated');
                  return;
                }
                setIsUploading(true);
                setError(null);
                try {
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('user_id', userId);

                  const response = await fetch('/api/studio/jobs', {
                    method: 'POST',
                    body: formData,
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to start job');
                  }

                  const jobData = await response.json();
                  onNext(jobData.job_id);
                } catch (err: any) {
                  setError(err.message || 'Failed to upload and start processing');
                } finally {
                  setIsUploading(false);
                }
              }}
              disabled={isUploading}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Start Transcription'}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setError(null);
              }}
              disabled={isUploading}
              className="px-4 py-2 border border-neutral-700 rounded-md hover:bg-neutral-900 transition-colors disabled:opacity-50"
            >
              Remove File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------
// Transcription Panel
// ----------------------
function TranscriptionPanel({
  file,
  transcription,
  setTranscription,
  jobId,
  jobStatus,
  setJobStatus,
  onNext,
}: {
  file: File | null;
  transcription: string;
  setTranscription: (text: string) => void;
  jobId: string | null;
  jobStatus: string | null;
  setJobStatus: (status: string | null) => void;
  onNext: () => void;
}) {
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Poll for job status and transcription
  useEffect(() => {
    if (!jobId) return;

    const pollJob = async () => {
      try {
        const response = await fetch(`/api/studio/jobs/${jobId}`);
        if (!response.ok) return;

        const job = await response.json();
        
        // Update job status
        setJobStatus(job.status);
        
        // Update transcription when available
        if (job.raw_transcript) {
          setTranscription(job.raw_transcript);
        }

        // Update status
        setIsTranscribing(
          job.status === 'TRANSCRIBING' || 
          job.status === 'NEW' ||
          job.status === 'ENRICHING'
        );

        // Auto-advance when transcription is complete
        if (job.status === 'ENRICHING' && job.raw_transcript) {
          setTimeout(() => onNext(), 1000);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    const interval = setInterval(pollJob, 2000);
    pollJob(); // Initial poll

    return () => clearInterval(interval);
  }, [jobId, onNext, setTranscription, setJobStatus]);

  return (
    <div className="border border-neutral-800 rounded-xl p-8">
      <div className="mb-4">
        <p className="text-neutral-400 mb-2">
          {file ? `Processing: ${file.name}` : 'No file selected'}
        </p>
        {isTranscribing && (
          <div className="flex items-center gap-2 text-neutral-400">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Transcribing... {jobStatus && `(${jobStatus})`}</span>
          </div>
        )}
      </div>

      <textarea
        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-200 min-h-[300px] focus:outline-none focus:border-neutral-700"
        value={transcription}
        onChange={(e) => setTranscription(e.target.value)}
        placeholder="Transcription will appear here..."
      />

      {transcription && !isTranscribing && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={onNext}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors"
          >
            Continue to Enrichment
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------
// Enrichment Panel
// ----------------------
function EnrichmentPanel({
  transcription,
  enriched,
  setEnriched,
  jobId,
  jobStatus,
  setJobStatus,
  onNext,
}: {
  transcription: string;
  enriched: string;
  setEnriched: (text: string) => void;
  jobId: string | null;
  jobStatus: string | null;
  setJobStatus: (status: string | null) => void;
  onNext: () => void;
}) {
  const [isEnriching, setIsEnriching] = useState(false);

  // Poll for enriched content
  useEffect(() => {
    if (!jobId || !transcription) return;

    const pollJob = async () => {
      try {
        const response = await fetch(`/api/studio/jobs/${jobId}`);
        if (!response.ok) return;

        const job = await response.json();
        
        // Update job status
        setJobStatus(job.status);
        
        if (job.enriched_text) {
          setEnriched(job.enriched_text);
        }

        setIsEnriching(
          job.status === 'ENRICHING' || 
          job.status === 'REFINING'
        );

        // Auto-advance when enrichment is complete
        if (job.status === 'REFINING' && job.enriched_text) {
          setTimeout(() => onNext(), 1000);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    const interval = setInterval(pollJob, 2000);
    pollJob();

    return () => clearInterval(interval);
  }, [jobId, transcription, onNext, setEnriched, setJobStatus]);

  return (
    <div className="border border-neutral-800 rounded-xl p-8">
      <div className="mb-4">
        <p className="text-neutral-400 mb-2">Add context and structure to the transcription</p>
        {isEnriching && (
          <div className="flex items-center gap-2 text-neutral-400">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Enriching content... {jobStatus && `(${jobStatus})`}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">Original</p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300 min-h-[200px] max-h-[300px] overflow-y-auto">
            {transcription || 'No transcription available'}
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">Enriched</p>
          <textarea
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-200 min-h-[200px] focus:outline-none focus:border-neutral-700"
            value={enriched}
            onChange={(e) => setEnriched(e.target.value)}
            placeholder="Enriched version will appear here..."
          />
        </div>
      </div>

      {enriched && (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors"
        >
          Continue to Refinement
        </button>
      )}
    </div>
  );
}

// ----------------------
// Refinement Panel
// ----------------------
function RefinementPanel({
  enriched,
  refined,
  setRefined,
  jobId,
  jobStatus,
  setJobStatus,
  onNext,
}: {
  enriched: string;
  refined: string;
  setRefined: (text: string) => void;
  jobId: string | null;
  jobStatus: string | null;
  setJobStatus: (status: string | null) => void;
  onNext: () => void;
}) {
  const [isRefining, setIsRefining] = useState(false);

  // Poll for refined content
  useEffect(() => {
    if (!jobId || !enriched) return;

    const pollJob = async () => {
      try {
        const response = await fetch(`/api/studio/jobs/${jobId}`);
        if (!response.ok) return;

        const job = await response.json();
        
        // Update job status
        setJobStatus(job.status);
        
        if (job.refined_output) {
          setRefined(job.refined_output);
        }

        setIsRefining(
          job.status === 'REFINING' || 
          job.status === 'COMPLETE'
        );

        // Auto-advance when refinement is complete
        if (job.status === 'COMPLETE' && job.refined_output) {
          setTimeout(() => onNext(), 1000);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    const interval = setInterval(pollJob, 2000);
    pollJob();

    return () => clearInterval(interval);
  }, [jobId, enriched, onNext, setRefined, setJobStatus]);

  return (
    <div className="border border-neutral-800 rounded-xl p-8">
      <div className="mb-4">
        <p className="text-neutral-400 mb-2">
          Refine into Evolution brand voice: understated, clear, confident, British English
        </p>
        {isRefining && (
          <div className="flex items-center gap-2 text-neutral-400">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Refining copy... {jobStatus && `(${jobStatus})`}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">Enriched</p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300 min-h-[200px] max-h-[300px] overflow-y-auto">
            {enriched || 'No enriched content available'}
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">Refined</p>
          <textarea
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-200 min-h-[200px] focus:outline-none focus:border-neutral-700"
            value={refined}
            onChange={(e) => setRefined(e.target.value)}
            placeholder="Final refined version will appear here..."
          />
        </div>
      </div>

      {refined && (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors"
        >
          View Final Output
        </button>
      )}
    </div>
  );
}

// ----------------------
// Output Panel
// ----------------------
function OutputPanel({
  refined,
  onReset,
}: {
  refined: string;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refined);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="border border-neutral-800 rounded-xl p-8">
      <div className="mb-4">
        <p className="text-neutral-400 mb-2">Final investor-ready update</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-sm text-neutral-200 whitespace-pre-wrap min-h-[300px] mb-6">
        {refined || 'Your refined update will appear here.'}
      </div>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          className="px-4 py-2 border border-neutral-700 rounded-md hover:bg-neutral-900 transition-colors"
          onClick={onReset}
        >
          Start New Update
        </button>
        {/* Future: Send to MyStable, Export buttons */}
      </div>
    </div>
  );
}
