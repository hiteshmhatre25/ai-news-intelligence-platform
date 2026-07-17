package com.newsintel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "bookmarks", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "article_id"}))
@Getter
@NoArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Bookmark(User user, Article article) {
        this.user = user;
        this.article = article;
    }
}
