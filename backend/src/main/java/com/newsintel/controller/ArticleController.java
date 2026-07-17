package com.newsintel.controller;

import com.newsintel.dto.ArticleResponse;
<<<<<<< HEAD
import com.newsintel.entity.User;
import com.newsintel.service.ArticleService;
import com.newsintel.service.ReadingHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
=======
import com.newsintel.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
<<<<<<< HEAD
    private final ReadingHistoryService readingHistoryService;
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86

    @GetMapping
    public Page<ArticleResponse> getArticles(
            @RequestParam(defaultValue = "0") int page,
<<<<<<< HEAD
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category
    ) {
        return articleService.getArticles(page, size, category);
=======
            @RequestParam(defaultValue = "20") int size
    ) {
        return articleService.getArticles(page, size);
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
    }

    @GetMapping("/{id}")
    public ArticleResponse getArticle(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    @PostMapping("/{id}/summarize")
<<<<<<< HEAD
    public ArticleResponse summarize(@AuthenticationPrincipal User user, @PathVariable Long id) {
        readingHistoryService.recordView(user, id);
        return articleService.summarizeArticle(id);
    }
}

=======
    public ArticleResponse summarize(@PathVariable Long id) {
        return articleService.summarizeArticle(id);
    }
}
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
