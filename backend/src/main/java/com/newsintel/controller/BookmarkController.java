package com.newsintel.controller;

import com.newsintel.dto.ArticleResponse;
import com.newsintel.dto.BookmarkResponse;
import com.newsintel.entity.User;
import com.newsintel.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    public Page<ArticleResponse> getBookmarks(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return bookmarkService.getBookmarks(user, page, size);
    }

    @PostMapping("/{articleId}")
    public BookmarkResponse toggle(@AuthenticationPrincipal User user, @PathVariable Long articleId) {
        boolean bookmarked = bookmarkService.toggleBookmark(user, articleId);
        return new BookmarkResponse(bookmarked);
    }
}
