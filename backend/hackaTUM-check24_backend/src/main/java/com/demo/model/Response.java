package com.demo.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private List<Craftsman> craftsmen;

    // Constructors, getters, and setters
}
