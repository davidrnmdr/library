package org.library.dto;

import java.time.LocalDateTime;

public record BorrowingDTO(
        Long id,
        String username,
        BookDTO bookDTO,
        LocalDateTime borrowedAt,
        LocalDateTime mustReturnAt,
        LocalDateTime returnedAt
) {
}

