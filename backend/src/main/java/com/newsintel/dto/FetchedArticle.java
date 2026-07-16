package com.newsintel.dto;

import java.time.Instant;

public record FetchedArticle(
        String title,
        String link,
        String description,
        Instant publishedAt,
        String source
) {
}
