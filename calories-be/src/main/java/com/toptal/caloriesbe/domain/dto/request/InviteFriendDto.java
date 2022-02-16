package com.toptal.caloriesbe.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InviteFriendDto implements Serializable {
    @NotNull(message = "name must not be NULL!")
    private String name;

    @NotNull(message = "email must not be NULL!")
    private String email;
}
