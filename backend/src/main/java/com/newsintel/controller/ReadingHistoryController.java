package com.newsintel.controller;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.entity.User;
import com.newsintel.service.ReadingHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class ReadingHistoryController {

    private final ReadingHistoryService readingHistoryService;

    @GetMapping
    public Page<ArticleResponse> getHistory(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return readingHistoryService.getHistory(user, page, size);
    }
}
