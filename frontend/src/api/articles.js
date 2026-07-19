import api from './axios'

export function fetchArticles(page = 0, size = 12, category = null) {
  const categoryParam = category ? `&category=${encodeURIComponent(category)}` : ''
  return api.get(`/articles?page=${page}&size=${size}${categoryParam}`).then((res) => res.data)
}

export function summarizeArticle(id) {
  return api.post(`/articles/${id}/summarize`).then((res) => res.data)
}