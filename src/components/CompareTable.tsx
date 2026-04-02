import { useState } from 'react';

interface ToolData {
  name:          string;
  slug:          string;
  rating:        number;
  price:         { freePlan: boolean; startingPrice: number; currency: string };
  features:      string[];
  pros:          string[];
  cons:          string[];
  bestFor:       string;
  affiliateLink: string;
  exportFormats?: string[];   // New field: supported export formats
  hasApi?:        boolean;    // New field: API availability
}

interface Props {
  tools: ToolData[];
}

export default function CompareTable({ tools }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const selectedTools = tools.filter(t => selected.includes(t.slug));

  function toggleTool(slug: string) {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev
    );
  }

  return (
    <div>
      {/* Tool Selector */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3">
          Select up to 3 tools to compare {selected.length > 0 && `(${selected.length}/3 selected)`}
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.map(tool => {
            const isSelected = selected.includes(tool.slug);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <button
                key={tool.slug}
                onClick={() => !isDisabled && toggleTool(tool.slug)}
                disabled={isDisabled}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                  ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : isDisabled
                      ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }
                `}
              >
                {tool.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt when nothing selected */}
      {selected.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">👆 Select at least 2 tools above to start comparing</p>
        </div>
      )}

      {/* Comparison Table */}
      {selectedTools.length >= 2 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 w-40">
                  Feature
                </th>
                {selectedTools.map(t => (
                  <th key={t.slug} className="p-4 bg-gray-50 border-b border-gray-200 text-center font-bold text-gray-900">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rating Row */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 text-sm font-semibold text-gray-700">Overall Rating</td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 border-b border-gray-100 text-center">
                    <span className="text-xl font-extrabold text-amber-500">{t.rating}</span>
                    <span className="text-gray-400 text-sm">/5</span>
                  </td>
                ))}
              </tr>

              {/* Price Row */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 text-sm font-semibold text-gray-700">Starting Price</td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 border-b border-gray-100 text-center text-sm text-gray-700">
                    {t.price.freePlan
                      ? <span className="text-green-600 font-medium">Free plan available</span>
                      : `$${t.price.startingPrice}/mo`
                    }
                  </td>
                ))}
              </tr>

              {/* Best For Row */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 text-sm font-semibold text-gray-700">Best For</td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 border-b border-gray-100 text-center text-xs text-gray-600">
                    {t.bestFor}
                  </td>
                ))}
              </tr>

              {/* Top Features Row */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 text-sm font-semibold text-gray-700 align-top pt-4">Top Features</td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 border-b border-gray-100 align-top">
                    <ul className="space-y-1">
                      {t.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="text-blue-500 shrink-0 mt-0.5">→</span> {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Technical Capabilities Row (new in Step 4) */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 text-sm font-semibold text-gray-700 align-top pt-4">
                  Technical Capabilities
                </td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 border-b border-gray-100 text-center align-top">
                    <div className="flex flex-col items-center gap-1.5">
                      {t.hasApi && (
                        <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded border border-purple-200">
                          🔌 API
                        </span>
                      )}
                      {t.exportFormats && t.exportFormats.length > 0 && (
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded border border-blue-200">
                          📦 {t.exportFormats.join(' · ')}
                        </span>
                      )}
                      {!t.hasApi && (!t.exportFormats || t.exportFormats.length === 0) && (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* CTA Row */}
              <tr>
                <td className="p-4 text-sm font-semibold text-gray-700">Action</td>
                {selectedTools.map(t => (
                  <td key={t.slug} className="p-4 text-center">
                    <a
                      href={t.affiliateLink}
                      target="_blank"
                      rel="nofollow noopener sponsored"
                      className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-colors"
                    >
                      Visit {t.name} →
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
