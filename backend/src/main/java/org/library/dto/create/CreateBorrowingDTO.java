package org.library.dto.create;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateBorrowingDTO(
        @NotNull(message = "É necessário informar o usuário")
        Long userId,

        @NotNull(message = "É necessário informar o livro")
        Long bookId,

        @Future(message = "A data de devolução deve ser futura")
        LocalDateTime mustReturnAt
) {
}
