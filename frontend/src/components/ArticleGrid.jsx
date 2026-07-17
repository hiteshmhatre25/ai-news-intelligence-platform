import ArticleCard from './ArticleCard'

function ArticleGrid({ articles, page, totalPages, onPageChange, onShowSummary, loading, error, emptyMessage }) {
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading articles...</p>
  if (error) return <p className="text-red-600">{error}</p>

  if (articles.length === 0) {
    return <p className="text-gray-400">{emptyMessage || 'No articles found.'}</p>
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} onShowSummary={onShowSummary} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {page + 1} of {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  )
}

export default ArticleGrid
