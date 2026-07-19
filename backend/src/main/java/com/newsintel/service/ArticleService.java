package com.newsintel.service;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.dto.FetchedArticle;
import com.newsintel.entity.Article;
import com.newsintel.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final GeminiService geminiService;

    public int saveNewArticles(List<FetchedArticle> fetchedArticles) {
        List<Article> newArticles = fetchedArticles.stream()
                .filter(fetched -> !articleRepository.existsByLink(fetched.link()))
                .map(fetched -> new Article(
                        fetched.title(),
                        fetched.link(),
                        fetched.description(),
                        fetched.source(),
                        fetched.category(),
                        fetched.publishedAt()
                ))
                .toList();

        articleRepository.saveAll(newArticles);
        return newArticles.size();
    }

    public ArticleResponse summarizeArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Article not found"));

        if (article.getSummary() == null) {
            String summary = geminiService.summarize(article.getTitle(), article.getDescription());
            article.setSummary(summary);
            articleRepository.save(article);
        }

        return ArticleResponse.from(article);
    }

    public Page<ArticleResponse> getArticles(int page, int size, String category) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt"));

        Page<Article> articles = (category == null || category.isBlank())
                ? articleRepository.findAll(pageable)
                : articleRepository.findByCategory(category, pageable);

        return articles.map(ArticleResponse::from);
    }

    public ArticleResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Article not found"));
        return ArticleResponse.from(article);
    }
}