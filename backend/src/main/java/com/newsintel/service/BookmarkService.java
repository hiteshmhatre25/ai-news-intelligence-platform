package com.newsintel.service;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.entity.Article;
import com.newsintel.entity.Bookmark;
import com.newsintel.entity.User;
import com.newsintel.repository.ArticleRepository;
import com.newsintel.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ArticleRepository articleRepository;

    public boolean toggleBookmark(User user, Long articleId) {
        var existing = bookmarkRepository.findByUserIdAndArticleId(user.getId(), articleId);

        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return false;
        }

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Article not found"));
        bookmarkRepository.save(new Bookmark(user, article));
        return true;
    }

    @Transactional(readOnly = true)
    public Page<ArticleResponse> getBookmarks(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookmarkRepository.findByUserId(user.getId(), pageable)
                .map(bookmark -> ArticleResponse.from(bookmark.getArticle()));
    }
}
