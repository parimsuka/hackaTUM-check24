package com.demo.web;

import com.demo.model.*;
import com.demo.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@EnableCaching
@RestController
@RequestMapping(value = "/rankings")
public class RankingsController {

    private final RankingService rankingService;

    @Autowired
    public RankingsController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("")
    public String empty() {
        return "hellooo";
    }

    @PostMapping("/craftman/{craftman_id}")
    public ResponseEntity<PatchResponse> updateRanking(
            @PathVariable Long craftman_id,
            @RequestBody PatchRequest patchRequest) {

        UpdatedFields updatedCraftsman = rankingService.updateRanking(craftman_id, patchRequest);

        PatchResponse patchResponse = new PatchResponse(craftman_id, updatedCraftsman);

        return ResponseEntity.ok(patchResponse);
    }

    @Cacheable(value="topNRankingsCache", key = "#postalcode", unless = "#result == null")
    @GetMapping("/craftsmen")
    public ResponseEntity<Response> getTopNRankings(
            @RequestParam String postalcode) {
        List<Craftsman> topRankings = rankingService.getTopNRankings(postalcode, 20);
        Response response = new Response(topRankings);
        return ResponseEntity.ok(response);
    }

    // Other endpoints and functionalities can be added based on your requirements
}
