package com.newsintel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "articles")
@Getter
@Setter
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true, length = 1000)
    private String link;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(nullable = false)
    private String source;

    @Column
    private String category;

    @Column(nullable = false)
    private Instant publishedAt;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Article(String title, String link, String description, String source, String category, Instant publishedAt) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.source = source;
        this.category = category;
        this.publishedAt = publishedAt;
    }
}