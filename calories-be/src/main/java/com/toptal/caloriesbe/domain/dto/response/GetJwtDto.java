package com.toptal.caloriesbe.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetJwtDto implements Serializable {
    private String accessToken;

    private String tokenType = "Bearer";

    private String email;

    private String name;

    private String role;
}
