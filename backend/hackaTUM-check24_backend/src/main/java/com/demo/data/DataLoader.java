package com.demo.data;

import com.demo.model.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class DataLoader {

    Map<Long, ProfileQualityFactor> qualityFactorMap;
    Map<Long, ServiceProviderProfile> serviceProviderMap;
    Map<String, Postcode> postCodeMap;

    public Map<String, PriorityQueue<Craftsman>> getCraftsmenByPostalCode() {
        return loadCraftsmenData("src/main/resources/data/quality_factor_score.json",
                "src/main/resources/data/service_provider_profile.json",
                "src/main/resources/data/postcode.json");
    }

    public Map<String, PriorityQueue<Craftsman>> loadCraftsmenData(String qualityFactorFilePath, String serviceProviderFilePath, String postcodeFilePath) {
        List<ProfileQualityFactor> qualityFactors = readJsonFile(qualityFactorFilePath, new TypeReference<List<ProfileQualityFactor>>() {});
        List<ServiceProviderProfile> serviceProviders = readJsonFile(serviceProviderFilePath, new TypeReference<List<ServiceProviderProfile>>() {});
        List<Postcode> postcodes = readJsonFile(postcodeFilePath, new TypeReference<List<Postcode>>() {});

        qualityFactorMap = convertListToMap(qualityFactors, ProfileQualityFactor::getProfile_id);
        serviceProviderMap = convertListToMap(serviceProviders, ServiceProviderProfile::getId);
        postCodeMap = convertListToMap(postcodes, Postcode::getPostcode);

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

    public <T, K> Map<K, T> convertListToMap(List<T> list, Function<T, K> keyExtractor) {
        return list.stream()
                .collect(Collectors.toMap(keyExtractor, Function.identity()));
    }

    private Map<String, PriorityQueue<Craftsman>> convertTocraftsmenByPostalCode(
            List<ProfileQualityFactor> qualityFactors,
            List<ServiceProviderProfile> serviceProviders,
            List<Postcode> postcodes) {

        // Use parallel streams to process the postcodes concurrently
        Map<String, PriorityQueue<Craftsman>> craftsmenByPostalCode = postcodes.stream()
                .parallel()
                .limit(2)  // Process the first two postcodes
                .collect(Collectors.toMap(
                        Postcode::getPostcode,
                        postcode -> {
                            // Use a priority queue to maintain craftsmen in sorted order
                            PriorityQueue<Craftsman> craftsmenQueue = new PriorityQueue<>(Collections.reverseOrder());

                            // Iterate over craftsmen and associate them with postal codes
                            qualityFactors.stream()
                                    .filter(qualityFactor -> shouldRankCraftsman(findServiceProviderById(serviceProviders, qualityFactor.getProfile_id()), postcode))
                                    .map(qualityFactor -> convertToCraftsman(qualityFactor, findServiceProviderById(serviceProviders, qualityFactor.getProfile_id()), postcode))
                                    .forEach(craftsman -> craftsmenQueue.add(craftsman));

                            return craftsmenQueue;
                        },
                        (queue1, queue2) -> {
                            // Merge priority queues for parallel processing
                            queue1.addAll(queue2);
                            return queue1;
                        }
                ));

        return craftsmenByPostalCode;
    }

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

        return serviceProvider.getMax_driving_distance() / 1000 + maxDrivingDistanceAdjustment;
    }

    private boolean shouldRankCraftsman(ServiceProviderProfile serviceProvider, Postcode postcode) {
        double distance = calculateDistance(serviceProvider, postcode);

        double adjustedMaxDistance = getAdjustedMaxDistance(serviceProvider, postcode);

        // Only rank craftsmen if the individual adapted MAX_DRIVING_DISTANCE is higher than the actual calculated DISTANCE
        return adjustedMaxDistance > distance;
    }

    public UpdatedFields updateCraftsmenByPostalCode(
            Map<String, PriorityQueue<Craftsman>> craftsmenByPostalCode,
            PatchRequest patchRequest,
            Long craftsmanId) {

        // Use parallel streams to process the affected zip codes concurrently
        craftsmenByPostalCode.keySet().stream().forEach(zipCode -> {
            // Retrieve craftsmen for the given craftsmanId
            ProfileQualityFactor qualityFactor = qualityFactorMap.get(craftsmanId);
            ServiceProviderProfile serviceProviderProfile = serviceProviderMap.get(craftsmanId);

            // Perform null checks for safety
            if (qualityFactor != null && serviceProviderProfile != null) {
                // Update the quality factor and service provider profile
                qualityFactor.setProfile_picture_score(patchRequest.getProfilePictureScore());
                qualityFactor.setProfile_description_score(patchRequest.getProfileDescriptionScore());
                serviceProviderProfile.setMax_driving_distance(patchRequest.getMaxDrivingDistance());

                // Update the maps with the modified objects
                qualityFactorMap.put(craftsmanId, qualityFactor);
                serviceProviderMap.put(craftsmanId, serviceProviderProfile);

                // Update the priority queue if needed
//                if (shouldRankCraftsman(serviceProviderProfile, postCodeMap.get(zipCode))) {
                    System.out.println("UPDATEEEEEEED");
                    // Retrieve the existing priority queue for the zip code
                    PriorityQueue<Craftsman> existingQueue = craftsmenByPostalCode.get(zipCode);

                    System.out.println(existingQueue);


//                    PriorityQueue<Craftsman> updatedQueue = existingQueue.stream()
//                            .filter(craftsman -> craftsman.getId().equals(craftsmanId))
//                            .map(craftsman -> convertToCraftsman(qualityFactor, serviceProviderProfile, postCodeMap.get(zipCode)))
//                            .collect(Collectors.toCollection(() -> new PriorityQueue<>(Collections.reverseOrder())));
//
//                    existingQueue.removeIf(craftsman -> craftsman.getId().equals(craftsmanId));
//                    existingQueue.addAll(updatedQueue);

                    Craftsman craftsmanToUpdate = existingQueue.stream()
                            .filter(craftsman -> craftsman.getId().equals(craftsmanId))
                            .findFirst()
                            .orElse(null);

                    if (craftsmanToUpdate != null) {
                        // Remove and add back to maintain the order
                        existingQueue.remove(craftsmanToUpdate);

                        // Update the specific craftsman with the new values
                        System.out.println(craftsmanToUpdate.getRankingScore());

                        Craftsman newCraftsMan = convertToCraftsman(qualityFactor, serviceProviderProfile, postCodeMap.get(zipCode));

                        System.out.println(newCraftsMan.getRankingScore());

                        existingQueue.add(newCraftsMan);


                    }



                    System.out.println(existingQueue);

                    // Replace the existing priority queue with the updated one
//                    craftsmenByPostalCode.put(zipCode, updatedQueue);
//                }
            }
        });

        return new UpdatedFields(patchRequest.getMaxDrivingDistance(), patchRequest.getProfilePictureScore(), patchRequest.getProfileDescriptionScore());
    }
}
