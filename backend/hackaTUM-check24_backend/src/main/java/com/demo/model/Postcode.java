package com.demo.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Postcode {

    private String postcode;
    private double lon;
    private double lat;
    private String postcode_extension_distance_group;

    // Date
    private String created_at;

    // Date
    private String updated_at;
}
