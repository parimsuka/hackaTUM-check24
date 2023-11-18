package com.demo.web;

import com.demo.model.*;
import com.demo.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rankings")
public class RankingsController {

    private final RankingService rankingService;

    @Autowired
    public RankingsController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @PostMapping("/update/{craftsmanId}")
    public ResponseEntity<PatchResponse> updateRanking(
            @PathVariable Long craftsmanId,
            @RequestBody PatchRequest patchRequest) {

        UpdatedFields updatedCraftsman = rankingService.updateRanking(craftsmanId, patchRequest);

        PatchResponse patchResponse = new PatchResponse(craftsmanId, updatedCraftsman);
        return ResponseEntity.ok(patchResponse);
    }

    @GetMapping("/getTopN")
    public ResponseEntity<Response> getTopNRankings(
            @RequestParam String zipCode) {

        List<Craftsman> topRankings = rankingService.getTopNRankings(zipCode, 20);
        Response response = new Response(topRankings);
        return ResponseEntity.ok(response);
    }

    // Other endpoints and functionalities can be added based on your requirements
}
