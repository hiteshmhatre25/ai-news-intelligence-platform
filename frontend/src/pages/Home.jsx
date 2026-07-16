import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchArticles } from '../api/articles'
import ArticleCard from '../components/ArticleCard'
import SummaryPanel from '../components/SummaryPanel'

function Home() {
  const { email, logout } = useAuth()
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError('')

    fetchArticles(page)
      .then((data) => {
        setArticles(data.content)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => setError('Failed to load articles. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">AI News Intelligence Platform</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{email}</span>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">
            Log out
          </button>
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading articles...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} onShowSummary={setSelectedArticle} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 text-sm bg-white border rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages}
              className="px-4 py-2 text-sm bg-white border rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}

      <SummaryPanel article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default Home
