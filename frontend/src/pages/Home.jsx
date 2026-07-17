import { useEffect, useState } from 'react'
<<<<<<< HEAD
import { fetchArticles } from '../api/articles'
import ArticleGrid from '../components/ArticleGrid'
import SummaryPanel from '../components/SummaryPanel'
import NavBar from '../components/NavBar'

const CATEGORIES = ['All', 'Technology', 'National', 'World']

function Home() {
=======
import { useAuth } from '../context/AuthContext'
import { fetchArticles } from '../api/articles'
import ArticleCard from '../components/ArticleCard'
import SummaryPanel from '../components/SummaryPanel'

function Home() {
  const { email, logout } = useAuth()
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
<<<<<<< HEAD
  const [category, setCategory] = useState('All')
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86

  useEffect(() => {
    setLoading(true)
    setError('')

<<<<<<< HEAD
    fetchArticles(page, 12, category === 'All' ? null : category)
=======
    fetchArticles(page)
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
      .then((data) => {
        setArticles(data.content)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => setError('Failed to load articles. Is the backend running?'))
      .finally(() => setLoading(false))
<<<<<<< HEAD
  }, [page, category])

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setPage(0)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <NavBar />

      <div className="flex gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 text-sm rounded-full border ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ArticleGrid
        articles={articles}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onShowSummary={setSelectedArticle}
        loading={loading}
        error={error}
        emptyMessage="No articles found in this category yet."
      />
=======
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
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86

      <SummaryPanel article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default Home
