package com.newsintel.dto;

import com.newsintel.entity.Article;

import java.time.Instant;

public record ArticleResponse(
        Long id,
        String title,
        String link,
        String description,
        String summary,
        String source,
        String category,
        Instant publishedAt
) {
    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getLink(),
                article.getDescription(),
                article.getSummary(),
                article.getSource(),
                article.getCategory(),
                article.getPublishedAt()
        );
    }
}