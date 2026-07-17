import { useEffect, useState } from 'react'
import { fetchBookmarks } from '../api/bookmarks'
import ArticleGrid from '../components/ArticleGrid'
import SummaryPanel from '../components/SummaryPanel'
import NavBar from '../components/NavBar'

function Bookmarks() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError('')

    fetchBookmarks(page)
      .then((data) => {
        setArticles(data.content.map((a) => ({ ...a, bookmarked: true })))
        setTotalPages(data.page.totalPages)
      })
      .catch(() => setError('Failed to load bookmarks.'))
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
        emptyMessage="No bookmarks yet — tap the star on any article to save it."
      />

      <SummaryPanel article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  )
}

export default Bookmarks
