package com.demo.service;

import com.demo.managers.RankingManager;
import com.demo.model.Craftsman;
import com.demo.model.PatchRequest;
import com.demo.model.UpdatedFields;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

@Service
public class RankingService {

    private final RankingManager rankingManager;
    private final Map<String, PriorityQueue<Craftsman>> zipCodeRankings;

    @Autowired
    public RankingService(RankingManager rankingManager) {
        this.rankingManager = rankingManager;
        this.zipCodeRankings = new HashMap<>();
    }

    public UpdatedFields updateRanking(Long craftsmanId, PatchRequest patchRequest) {
        return rankingManager.updateRanking(craftsmanId, patchRequest);
    }

    public List<Craftsman> getTopNRankings(String zipCode, int n) {
        return rankingManager.getTopNRankings(zipCode, n);
    }
}
