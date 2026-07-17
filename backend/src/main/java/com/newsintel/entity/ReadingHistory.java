package com.newsintel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "reading_history", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "article_id"}))
@Getter
@Setter
@NoArgsConstructor
public class ReadingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(nullable = false)
    private Instant viewedAt = Instant.now();

    public ReadingHistory(User user, Article article) {
        this.user = user;
        this.article = article;
    }
}
