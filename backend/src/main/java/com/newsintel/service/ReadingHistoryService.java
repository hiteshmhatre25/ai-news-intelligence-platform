package com.newsintel.service;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.entity.ReadingHistory;
import com.newsintel.entity.User;
import com.newsintel.repository.ArticleRepository;
import com.newsintel.repository.ReadingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ReadingHistoryService {

    private final ReadingHistoryRepository readingHistoryRepository;
    private final ArticleRepository articleRepository;

    public void recordView(User user, Long articleId) {
        readingHistoryRepository.findByUserIdAndArticleId(user.getId(), articleId)
                .ifPresentOrElse(
                        existing -> {
                            existing.setViewedAt(Instant.now());
                            readingHistoryRepository.save(existing);
                        },
                        () -> articleRepository.findById(articleId).ifPresent(article ->
                                readingHistoryRepository.save(new ReadingHistory(user, article))
                        )
                );
    }

    @Transactional(readOnly = true)
    public Page<ArticleResponse> getHistory(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return readingHistoryRepository.findByUserIdOrderByViewedAtDesc(user.getId(), pageable)
                .map(entry -> ArticleResponse.from(entry.getArticle()));
    }
}
