<<<<<<< HEAD
import { useState } from 'react'
import { toggleBookmark } from '../api/bookmarks'

function ArticleCard({ article, onShowSummary }) {
  const [bookmarked, setBookmarked] = useState(article.bookmarked ?? false)
  const [saving, setSaving] = useState(false)

=======
function ArticleCard({ article, onShowSummary }) {
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

<<<<<<< HEAD
  const handleBookmark = async () => {
    setSaving(true)
    try {
      const result = await toggleBookmark(article.id)
      setBookmarked(result.bookmarked)
    } catch (err) {
      // silently ignore; bookmark state just won't change
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{article.source}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{formattedDate}</span>
          <button
            onClick={handleBookmark}
            disabled={saving}
            title={bookmarked ? 'Remove bookmark' : 'Save bookmark'}
            className="text-lg leading-none disabled:opacity-50"
          >
            {bookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      {article.category && (
        <span className="inline-block text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded px-2 py-0.5 mb-2 w-fit">
          {article.category}
        </span>
      )}

      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{article.title}</h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
=======
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-blue-600">{article.source}</span>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      <h2 className="font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h2>

      <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
        {article.description}
      </p>

      <div className="flex gap-3">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
<<<<<<< HEAD
          className="flex-1 text-center text-sm border border-gray-200 dark:border-gray-600 rounded py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
=======
          className="flex-1 text-center text-sm border border-gray-200 rounded py-2 text-gray-700 hover:bg-gray-50"
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
        >
          Read Article
        </a>
        <button
          onClick={() => onShowSummary(article)}
<<<<<<< HEAD
          className="flex-1 text-center text-sm border border-purple-200 dark:border-purple-800 rounded py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
=======
          className="flex-1 text-center text-sm border border-purple-200 rounded py-2 text-purple-600 hover:bg-purple-50"
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
        >
          ✦ AI Summary
        </button>
      </div>
    </div>
  )
}

export default ArticleCard
