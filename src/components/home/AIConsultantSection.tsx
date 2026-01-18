import { useState } from 'react';
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
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/.netlify/functions/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      setResponse(data);
    } catch (err: any) {
      console.error(err);
      setError('Our AI consultant is currently busy. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Bot className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Business Consultant
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Describe your business challenge or goal (e.g., "I want to automate my bakery's orders"), and we'll find the perfect guides for you.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleConsult} className="relative max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden p-2">
              <Search className="w-6 h-6 text-gray-400 ml-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How can AI help my real estate business?"
                className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Ask AI
                  </>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>

        {/* Results Display */}
        {response && (
          <div className="space-y-8 animate-fade-in-up">
            {/* AI Message Intro */}
            {response.message && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-900/50">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {response.message}
                </p>
              </div>
            )}

            {/* Recommendations Grid */}
            {response.recommendations && response.recommendations.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {response.recommendations.map((rec, idx) => (
                  <Link 
                    key={idx} 
                    to={`/blog/${rec.slug}`}
                    className="block group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {rec.reason}
                    </p>
                    <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium text-sm group-hover:underline">
                      Read Article <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Fallback if no specific recs found */}
            {(!response.recommendations || response.recommendations.length === 0) && (
              <p className="text-center text-gray-500">
                No specific articles found for this topic yet, but check out our latest posts below!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}