package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchRequest {
    private long maxDrivingDistance;
    private double profilePictureScore;
    private double profileDescriptionScore;

    // Constructors, getters, and setters
}
