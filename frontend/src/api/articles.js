import api from './axios'

<<<<<<< HEAD
export function fetchArticles(page = 0, size = 12, category = null) {
  const categoryParam = category ? `&category=${encodeURIComponent(category)}` : ''
  return api.get(`/articles?page=${page}&size=${size}${categoryParam}`).then((res) => res.data)
=======
export function fetchArticles(page = 0, size = 12) {
  return api.get(`/articles?page=${page}&size=${size}`).then((res) => res.data)
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
}

export function summarizeArticle(id) {
  return api.post(`/articles/${id}/summarize`).then((res) => res.data)
}
