package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchResponse {
    private Long id;
    private UpdatedFields updated;

    // Constructors, getters, and setters
}
