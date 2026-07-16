package com.newsintel.repository;

import com.newsintel.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    boolean existsByLink(String link);
}
