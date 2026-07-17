import api from './axios'

export function fetchBookmarks(page = 0, size = 12) {
  return api.get(`/bookmarks?page=${page}&size=${size}`).then((res) => res.data)
}

export function toggleBookmark(articleId) {
  return api.post(`/bookmarks/${articleId}`).then((res) => res.data)
}

export function fetchHistory(page = 0, size = 12) {
  return api.get(`/history?page=${page}&size=${size}`).then((res) => res.data)
}
