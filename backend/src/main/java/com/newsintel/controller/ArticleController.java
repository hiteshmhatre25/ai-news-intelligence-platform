package com.newsintel.controller;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.entity.User;
import com.newsintel.service.ArticleService;
import com.newsintel.service.ReadingHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    private final ReadingHistoryService readingHistoryService;

    @GetMapping
    public Page<ArticleResponse> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category
    ) {
        return articleService.getArticles(page, size, category);
    }

    @GetMapping("/{id}")
    public ArticleResponse getArticle(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    @PostMapping("/{id}/summarize")
    public ArticleResponse summarize(@AuthenticationPrincipal User user, @PathVariable Long id) {
        readingHistoryService.recordView(user, id);
        return articleService.summarizeArticle(id);
    }
}