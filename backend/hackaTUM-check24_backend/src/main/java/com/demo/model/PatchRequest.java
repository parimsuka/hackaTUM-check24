package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchRequest {
    private Double maxDrivingDistance;
    private Double profilePictureScore;
    private Double profileDescriptionScore;

    // Constructors, getters, and setters
}
