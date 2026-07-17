import { useEffect, useState } from 'react'
import { fetchHistory } from '../api/bookmarks'
import ArticleGrid from '../components/ArticleGrid'
import SummaryPanel from '../components/SummaryPanel'
import NavBar from '../components/NavBar'

function History() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError('')

    fetchHistory(page)
      .then((data) => {
        setArticles(data.content)
        setTotalPages(data.page.totalPages)
      })
      .catch(() => setError('Failed to load reading history.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <NavBar />

      <ArticleGrid
        articles={articles}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onShowSummary={setSelectedArticle}
        loading={loading}
        error={error}
        emptyMessage="No reading history yet — open an article's AI summary to start tracking."
      />

      <SummaryPanel article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default History
