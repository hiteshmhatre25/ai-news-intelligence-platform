package com.newsintel.repository;

import com.newsintel.entity.Bookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Page<Bookmark> findByUserId(Long userId, Pageable pageable);

    Optional<Bookmark> findByUserIdAndArticleId(Long userId, Long articleId);
}
