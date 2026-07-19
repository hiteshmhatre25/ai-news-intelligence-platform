import { useEffect, useState } from 'react'
import { fetchArticles } from '../api/articles'
import ArticleGrid from '../components/ArticleGrid'
import SummaryPanel from '../components/SummaryPanel'
import NavBar from '../components/NavBar'

const CATEGORIES = ['All', 'Technology', 'National', 'World']

function Home() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    setLoading(true)
    setError('')

    fetchArticles(page, 12, category === 'All' ? null : category)
      .then((data) => {
        setArticles(data.content)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => setError('Failed to load articles. Is the backend running?'))
      .finally(() => setLoading(false))
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

      <SummaryPanel article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default Home