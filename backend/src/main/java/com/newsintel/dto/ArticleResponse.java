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
<<<<<<< HEAD
        String category,
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
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
<<<<<<< HEAD
                article.getCategory(),
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
                article.getPublishedAt()
        );
    }
}
