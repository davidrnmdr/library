package org.library.mapper;

import org.library.dto.BorrowingDTO;
import org.springframework.stereotype.Component;

@Component
public class BorrowingMapper {

    public static BorrowingDTO toDto(org.library.entity.Borrowing borrowing) {
        return new BorrowingDTO(
                borrowing.getId(),
                borrowing.getUser().getUsername(),
                BookMapper.toDto(borrowing.getBook()),
                borrowing.getBorrowedAt(),
                borrowing.getMustReturnAt(),
                borrowing.getReturnedAt()
        );
    }
}
