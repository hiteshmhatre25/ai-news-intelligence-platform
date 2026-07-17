package com.newsintel.dto;

import java.time.Instant;

public record FetchedArticle(
        String title,
        String link,
        String description,
        Instant publishedAt,
<<<<<<< HEAD
        String source,
        String category
=======
        String source
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
) {
}
