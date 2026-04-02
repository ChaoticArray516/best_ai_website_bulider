// ToolSearch.tsx - Real-time search/filter component for AI tools
// This is a React Island component that hydrates on client side
'use client';
import { useState, useMemo } from 'react';

// Interface for searchable tool data (subset of full tool data)
interface SearchTool {
  name:          string;
  slug:          string;
  tagline:       string;
  rating:        number;
  bestFor:       string;
  affiliateLink: string;
  price: {
    freePlan:       boolean;
    startingPrice:  number;
  };
}

interface Props {
  tools: SearchTool[];
}

export default function ToolSearch({ tools }: Props) {
  // Query state for search input
  const [query, setQuery] = useState('');

  // Memoized filtered results for performance
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tools.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q)
    );
  }, [query, tools]);

  // Show results only when user has typed something
  const showResults = query.trim().length > 0;

  return (
    <div className="mb-8">
      {/* Search Input with magnifying glass icon */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search tools by name or use case..."
          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
        />
        {/* Clear button appears when query exists */}
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="mt-3 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            // No results state
            <p className="p-5 text-gray-500 text-sm text-center">
              No tools found for "<strong>{query}</strong>". Try a different search term.
            </p>
          ) : (
            // Results list
            <ul>
              {filtered.map((tool, i) => (
                <li
                  key={tool.slug}
                  className={`flex items-center justify-between p-4 hover:bg-blue-50 transition-colors ${
                    i < filtered.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900 text-sm">{tool.name}</span>
                      <span className="text-amber-500 font-bold text-xs">{tool.rating}/5</span>
                      {tool.price.freePlan && (
                        <span className="text-green-600 text-xs font-medium">· Free plan</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{tool.tagline}</p>
                  </div>
                  <a
                    href={`/review/${tool.slug}/`}
                    className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Read review →
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
