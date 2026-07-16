import { useEffect, useState } from 'react'
import { summarizeArticle } from '../api/articles'

function SummaryPanel({ article, onClose }) {
  const [summary, setSummary] = useState(article?.summary ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSummary(article?.summary ?? null)
    setError('')

    if (article && !article.summary) {
      setLoading(true)
      summarizeArticle(article.id)
        .then((updated) => setSummary(updated.summary))
        .catch(() => setError('Could not generate summary right now'))
        .finally(() => setLoading(false))
    }
  }, [article])

  const isOpen = !!article

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {article && (
          <>
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <span className="text-xs font-medium text-blue-600">{article.source}</span>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
                ×
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-grow">
              <h2 className="font-semibold text-gray-800 mb-4">{article.title}</h2>

              <span className="text-xs text-purple-600 font-medium">✦ AI Summary</span>

              {loading && <p className="text-sm text-gray-400 mt-2">Generating summary...</p>}
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              {summary && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{summary}</p>}
              {!loading && !error && !summary && (
                <p className="text-sm text-gray-400 mt-2">No summary available for this article.</p>
              )}
            </div>

            <div className="p-5 border-t border-gray-100">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-blue-600 text-white rounded py-2 text-sm font-medium hover:bg-blue-700"
              >
                Read Full Article
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SummaryPanel
