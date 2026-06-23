package org.library.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @Email(message = "O email deve ser válido")
        @NotBlank(message = "O email é obrigatório")
        String username,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, message = "A senha deve conter pelo menos 6 caracteres")
        String password
) {}

