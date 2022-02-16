package com.toptal.caloriesbe.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogInDto implements Serializable {

    @NotNull(message = "email must not be NULL!")
    private String email;

    @NotNull(message = "password must not be NULL!")
    private String password;

}
