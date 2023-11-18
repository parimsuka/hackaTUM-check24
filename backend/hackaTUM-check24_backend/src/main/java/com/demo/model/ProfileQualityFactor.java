package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileQualityFactor {
    private long profile_id;
    private double profile_picture_score;
    private double profile_description_score;
}
