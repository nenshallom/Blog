import { useState, useEffect } from 'react';
import { Bot, Search, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recommendation {
  title: string;
  reason: string;
  slug: string;
}

interface AIResponse {
  message?: string;
  recommendations?: Recommendation[];
}

export default function AIConsultantSection() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persistence logic
  const [response, setResponse] = useState<AIResponse | null>(() => {
    const saved = sessionStorage.getItem('ai_consultant_cache');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (response) {
      sessionStorage.setItem('ai_consultant_cache', JSON.stringify(response));
    }
  }, [response]);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/.netlify/functions/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get recommendations');

      setResponse(data);
    } catch (err: any) {
      setError('Our AI consultant is currently busy. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setQuery('');
    sessionStorage.removeItem('ai_consultant_cache');
  };

  return (
    <section id="ai-consultant" className="py-16 px-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Bot className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">AI Business Consultant</h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Describe your business challenge or goal (e.g., "I want to automate my bakery's orders"), and we'll find the perfect guides for you.
          </p>

        </div>

        <form onSubmit={handleConsult} className="relative max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2">
              <Search className="w-6 h-6 text-gray-400 ml-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How can AI help my business?"
                className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-3 py-3 w-32 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {loading ? 'Thinking...' : 'Ask AI'}
              </button>
            </div>
          </div>
          {response && (
            <button onClick={handleReset} className="mt-4 text-xs text-gray-500 hover:text-green-600 underline block mx-auto">
              Start a new search
            </button>
          )}
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>

        {response?.recommendations && (
          <div className="grid gap-6 md:grid-cols-2">
            {response.recommendations.map((rec, idx) => {
              const cleanSlug = rec.slug
                .replace(/^blog\//, '') // Removes 'blog/' from start
                .replace(/^\//, '');    // Removes leading '/'

              return (
                <Link 
                  key={idx} 
                  to={`${cleanSlug}`}
                  className="block group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:border-green-500 transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{rec.reason}</p>
                  <span className="inline-flex items-center text-green-600 font-medium text-sm group-hover:underline">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}