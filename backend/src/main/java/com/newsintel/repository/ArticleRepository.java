package com.newsintel.repository;

import com.newsintel.entity.Article;
<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    boolean existsByLink(String link);
<<<<<<< HEAD

    Page<Article> findByCategory(String category, Pageable pageable);
=======
>>>>>>> d83e456c436d41d0fcbee5a86a908340a5f93e86
}
