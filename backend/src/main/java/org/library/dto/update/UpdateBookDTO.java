package org.library.dto.update;

import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.ISBN;

import java.util.Set;

public record UpdateBookDTO(
        String title,

        String author,

        @ISBN(message = "O ISBN precisa ser válido")
        String isbn,

        Set<Long> categoriesIds,

        @PositiveOrZero(message = "O número de cópias deve ser zero ou positivo")
        Integer copies
) {
}
