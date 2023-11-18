package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProviderProfile {
    private long id;
    private String first_name;
    private String last_name;
    private String city;
    private String street;
    private String house_number;
    private double lon;
    private double lat;
    private long max_driving_distance;
}
