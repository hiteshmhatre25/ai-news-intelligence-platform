function ArticleCard({ article, onShowSummary }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-blue-600">{article.source}</span>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      <h2 className="font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h2>

      <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
        {article.description}
      </p>

      <div className="flex gap-3">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm border border-gray-200 rounded py-2 text-gray-700 hover:bg-gray-50"
        >
          Read Article
        </a>
        <button
          onClick={() => onShowSummary(article)}
          className="flex-1 text-center text-sm border border-purple-200 rounded py-2 text-purple-600 hover:bg-purple-50"
        >
          ✦ AI Summary
        </button>
      </div>
    </div>
  )
}

export default ArticleCard
