import { useState } from 'react';
import { Sparkles, X, RefreshCw, Loader2 } from 'lucide-react'; 

interface SummaryButtonProps {
  postId: string;
  initialSummary?: string;
}

export default function SummaryButton({ postId, initialSummary }: SummaryButtonProps) {
  const [summary, setSummary] = useState<string | null>(initialSummary || null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>(''); // For "Queued..." messages
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async (forceRegenerate = false) => {
    setLoading(true);
    setError(null);
    setStatusMessage('Initializing...');

    // Recursive polling function
    const checkStatus = async (attempts = 0): Promise<void> => {
      try {
        const response = await fetch('/.netlify/functions/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, forceRegenerate }),
        });

        const data = await response.json();

        // SCENARIO 1: Success!
        if (response.status === 200) {
          setSummary(data.summary);
          setIsOpen(true);
          setLoading(false);
          return;
        }

        // SCENARIO 2: Processing (Locked by another user)
        if (response.status === 202) {
          if (attempts > 10) { // Timeout after ~20 seconds
             throw new Error("Generation timed out. Please try again.");
          }
          setStatusMessage('AI Regenerating, please wait');
          // Wait 2 seconds then try again
          setTimeout(() => checkStatus(attempts + 1), 2000);
          return;
        }

        // SCENARIO 3: Error
        throw new Error(data.error || 'Failed to generate summary');

      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Start the process
    checkStatus();
  };

  // ... (Render Logic below is similar to before) ...
  
  if (summary && isOpen) {
    return (
      <div className="my-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 shadow-sm relative animate-fadeUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 font-bold text-green-800 dark:text-green-300 text-lg">
            <Sparkles className="w-5 h-5" />
            TL;DR Summary
          </h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleSummarize(true)}
              disabled={loading}
              title="Refresh"
              className="p-2 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/50 rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content Body */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-6 text-green-700 dark:text-green-400 gap-2">
             <Loader2 className="w-6 h-6 animate-spin" />
             <p className="text-sm font-medium">{statusMessage}</p>
           </div>
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {summary!.split('\n').map((line, i) => {
              const cleanLine = line.replace(/^[\-\*]\s?/, '').trim(); 
              if(!cleanLine) return null;
              return <li key={i}>{cleanLine}</li>;
            })}
          </ul>
        )}
      </div>
    );
  }

  // Initial State
  return (
    <div className="my-6">
      <button
        onClick={() => handleSummarize(false)}
        disabled={loading}
        className="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? statusMessage || 'Analyzing...' : 'Summarize with AI'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
    </div>
  );
}