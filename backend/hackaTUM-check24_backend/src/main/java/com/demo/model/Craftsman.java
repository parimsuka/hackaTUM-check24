package com.demo.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Craftsman implements Comparable<Craftsman> {
    private Long id;
    private String name; // firstname + lastname
    private Double rankingScore;

    // Constructors, getters, and setters

    @Override
    public int compareTo(Craftsman otherCraftsman) {
        // Compare based on rankingScore
        return Double.compare(this.rankingScore, otherCraftsman.rankingScore);
    }
}
