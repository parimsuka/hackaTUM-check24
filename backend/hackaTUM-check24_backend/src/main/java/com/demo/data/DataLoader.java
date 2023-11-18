package com.demo.data;

import com.demo.managers.RankingManager;
import com.demo.model.Craftsman;
import com.demo.model.Postcode;
import com.demo.model.ProfileQualityFactor;
import com.demo.model.ServiceProviderProfile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Component
public class DataLoader {

    public Map<String, PriorityQueue<Craftsman>> getCraftsmenByPostalCode() {
        return loadCraftsmenData("src/main/resources/data/quality_factor_score.json", "src/main/resources/data/service_provider_profile.json", "src/main/resources/data/postcode.json");
    }

    public Map<String, PriorityQueue<Craftsman>> loadCraftsmenData(String qualityFactorFilePath, String serviceProviderFilePath, String postcodeFilePath) {
        List<ProfileQualityFactor> qualityFactors = readJsonFile(qualityFactorFilePath, new TypeReference<List<ProfileQualityFactor>>() {});
        List<ServiceProviderProfile> serviceProviders = readJsonFile(serviceProviderFilePath, new TypeReference<List<ServiceProviderProfile>>() {});
        List<Postcode> postcodes = readJsonFile(postcodeFilePath, new TypeReference<List<Postcode>>() {});

        // Assuming you have Craftsmen class and methods for conversion
        return convertTocraftsmenByPostalCode(qualityFactors, serviceProviders, postcodes);
    }

    private <T> List<T> readJsonFile(String filePath, TypeReference<List<T>> typeReference) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(new File(filePath), typeReference);
        } catch (IOException e) {
            // Handle exception (e.g., log, throw a custom exception)
            e.printStackTrace();
            return List.of();
        }
    }

    private Map<String, PriorityQueue<Craftsman>> convertTocraftsmenByPostalCode(
            List<ProfileQualityFactor> qualityFactors,
            List<ServiceProviderProfile> serviceProviders,
            List<Postcode> postcodes) {

        // Create a map to associate craftsmen with postal codes
        Map<String, PriorityQueue<Craftsman>> craftsmenByPostalCode = new HashMap<>();

        // Iterate over postcodes
        for (Postcode postcode : postcodes) {
            String postalCode = postcode.getPostcode();

            // Initialize a priority queue for each postal code
            PriorityQueue<Craftsman> craftsmenQueue = new PriorityQueue<>();
            craftsmenByPostalCode.put(postalCode, craftsmenQueue);

            // Iterate over craftsmen and associate them with postal codes
            for (ProfileQualityFactor qualityFactor : qualityFactors) {
                // Assuming there's a method to find the corresponding service provider by profile_id
                ServiceProviderProfile serviceProvider = findServiceProviderById(serviceProviders, qualityFactor.getProfile_id());

                // Only add craftsmen if the condition holds
                if (shouldRankCraftsman(serviceProvider, postcode)) {
                    Craftsman craftsman = convertToCraftsman(qualityFactor, serviceProvider, postcode);
                    craftsmenQueue.add(craftsman);

//                    rankingManager.updateRanking(craftsman.getId(), craftsman);
                }
            }
        }

        return craftsmenByPostalCode;
    }

//    private void insertCraftsmenIntoRankingManager(Map<String, PriorityQueue<Craftsman>> craftsmenByPostalCode) {
//        // Insert craftsmen into the RankingManager
//        for (Craftsman craftsman : craftsmen) {
//            rankingManager.updateRanking(craftsman.getZipCode(), craftsman);
//        }
//    }

    // Additional helper methods for conversion and retrieval can be added as needed

    private ServiceProviderProfile findServiceProviderById(List<ServiceProviderProfile> serviceProviders, long profileId) {
        // Implement logic to find the service provider by profile_id
        return serviceProviders.stream()
                .filter(provider -> provider.getId() == profileId)
                .findFirst()
                .orElse(null);
    }

    private Craftsman convertToCraftsman(ProfileQualityFactor qualityFactor, ServiceProviderProfile serviceProvider, Postcode postcode) {
        Objects.requireNonNull(qualityFactor, "qualityFactor must not be null");
        Objects.requireNonNull(serviceProvider, "serviceProvider must not be null");

        Craftsman craftsman = new Craftsman();
        craftsman.setId(serviceProvider.getId());
        craftsman.setName(serviceProvider.getFirst_name() + " " + serviceProvider.getLast_name());
        craftsman.setRankingScore(calculateRank(qualityFactor, serviceProvider, postcode));

        return craftsman;
    }

    private double calculateRank(ProfileQualityFactor qualityFactor, ServiceProviderProfile serviceProvider, Postcode postcode) {
        double profileScore = calculateProfileScore(qualityFactor);
        double distance = calculateDistance(serviceProvider, postcode);

        double defaultDistance = 80.0;

        double distanceScore = 1 - (distance / defaultDistance);

        // Adjust distance weight based on distance comparison
        double distanceWeight = (distance > defaultDistance) ? 0.01 : 0.15;

        // Calculate the final rank
        return distanceWeight * distanceScore + (1 - distanceWeight) * profileScore;
    }

    private double calculateProfileScore(ProfileQualityFactor qualityFactor) {
        // Calculate PROFILE_SCORE = 0.4 * PROFILE_PICTURE_SCORE + 0.6 * PROFILE_DESCRIPTION_SCORE
        return 0.4 * qualityFactor.getProfile_picture_score() + 0.6 * qualityFactor.getProfile_description_score();
    }

    private double calculateDistance(ServiceProviderProfile serviceProvider, Postcode postcode) {
       // Haversine formula

        // Radius of the Earth in kilometers
        double EARTH_RADIUS = 6371.0;

        double startLat = postcode.getLat();
        double startLong = postcode.getLon();
        double endLat = serviceProvider.getLat();
        double endLong = serviceProvider.getLon();

        double dLat = Math.toRadians((endLat - startLat));
        double dLong = Math.toRadians((endLong - startLong));

        startLat = Math.toRadians(startLat);
        endLat = Math.toRadians(endLat);

        double a = haversine(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversine(dLong);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    double haversine(double val) {
        return Math.pow(Math.sin(val / 2), 2);
    }

    private double getAdjustedMaxDistance(ServiceProviderProfile serviceProvider, Postcode postcode) {
        // Adjust MAX_DRIVING_DISTANCE based on postcode group
        String postcodeGroup = postcode.getPostcode_extension_distance_group();

        // Adjust MAX_DRIVING_DISTANCE based on postcode group
        double maxDrivingDistanceAdjustment = 0.0;
        if ("group_b".equals(postcodeGroup)) {
            maxDrivingDistanceAdjustment = 2.0;
        } else if ("group_c".equals(postcodeGroup)) {
            maxDrivingDistanceAdjustment = 5.0;
        }

        return serviceProvider.getMax_driving_distance() + maxDrivingDistanceAdjustment;
    }

    private boolean shouldRankCraftsman(ServiceProviderProfile serviceProvider, Postcode postcode) {
        double distance = calculateDistance(serviceProvider, postcode);

        double adjustedMaxDistance = getAdjustedMaxDistance(serviceProvider, postcode);

        // Only rank craftsmen if the individual adapted MAX_DRIVING_DISTANCE is higher than the actual calculated DISTANCE
        return adjustedMaxDistance > distance;
    }
}
