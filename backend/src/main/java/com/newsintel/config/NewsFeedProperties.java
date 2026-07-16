package com.newsintel.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "news")
public class NewsFeedProperties {

    private List<FeedSource> feeds = List.of();

    public List<FeedSource> getFeeds() {
        return feeds;
    }

    public void setFeeds(List<FeedSource> feeds) {
        this.feeds = feeds;
    }

    public record FeedSource(String name, String url) {
    }
}
