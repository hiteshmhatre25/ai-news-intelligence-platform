package com.newsintel.repository;

import com.newsintel.entity.ReadingHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReadingHistoryRepository extends JpaRepository<ReadingHistory, Long> {

    Optional<ReadingHistory> findByUserIdAndArticleId(Long userId, Long articleId);

    Page<ReadingHistory> findByUserIdOrderByViewedAtDesc(Long userId, Pageable pageable);
}
