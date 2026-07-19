package com.newsintel.service;

import com.newsintel.config.NewsFeedProperties;
import com.newsintel.dto.FetchedArticle;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsFetchService {

    private final NewsFeedProperties feedProperties;
    private final ArticleService articleService;

    @Scheduled(fixedRate = 15, timeUnit = TimeUnit.MINUTES)
    public void syncNews() {
        List<FetchedArticle> articles = fetchAllArticles();
        int savedCount = articleService.saveNewArticles(articles);
        log.info("Scheduled sync fetched {} articles, saved {} new", articles.size(), savedCount);
    }

    public List<FetchedArticle> fetchAllArticles() {
        return feedProperties.getFeeds().stream()
                .flatMap(source -> fetchFeed(source).stream())
                .toList();
    }

    private List<FetchedArticle> fetchFeed(NewsFeedProperties.FeedSource source) {
        try (XmlReader reader = new XmlReader(URI.create(source.url()).toURL())) {
            SyndFeed feed = new SyndFeedInput().build(reader);
            return feed.getEntries().stream()
                    .map(entry -> toArticle(entry, source.name()))
                    .toList();
        } catch (Exception e) {
            log.warn("Failed to fetch feed '{}': {}", source.name(), e.getMessage());
            return List.of();
        }
    }

    private FetchedArticle toArticle(SyndEntry entry, String sourceName) {
        String description = entry.getDescription() != null ? entry.getDescription().getValue() : "";
        Instant publishedAt = entry.getPublishedDate() != null
                ? entry.getPublishedDate().toInstant()
                : Instant.now();

        return new FetchedArticle(
                entry.getTitle(), entry.getLink(), description, publishedAt, sourceName, resolveCategory(entry, sourceName)
        );
    }

    private String resolveCategory(SyndEntry entry, String sourceName) {
        if (!entry.getCategories().isEmpty()) {
            return entry.getCategories().get(0).getName();
        }
        return defaultCategoryFor(sourceName);
    }

    private String defaultCategoryFor(String sourceName) {
        return switch (sourceName) {
            case "TechCrunch" -> "Technology";
            case "The Hindu" -> "National";
            default -> "World";
        };
    }
}