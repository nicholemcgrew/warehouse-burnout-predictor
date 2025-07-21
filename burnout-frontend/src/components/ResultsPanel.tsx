import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { PredictionResponse } from "../types/prediction";

interface Props {
  result: PredictionResponse;
  form: {
    overall: number;
    workLife: number;
    culture: number;
    review: string;
  };
}

const ResultsPanel: React.FC<Props> = ({ result }) => {
  const { prediction, confidence, status, recommendation, reasoning, keyFactors, businessImpact, probabilities } = result;

  const getBarColor = (label: string) => {
    switch (label) {
      case "high":
        return "#d32f2f"; // red
      case "medium":
        return "#f9a825"; // yellow
      case "low":
        return "#388e3c"; // green
      default:
        return "#90a4ae"; // gray
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f9f9f9",
        color: "#111",
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom color="primary">
        🎯 PREDICTION RESULTS
      </Typography>

      <Typography>
        ⚠️ <strong>STRESS LEVEL:</strong> {prediction}
        <br />
        📊 <strong>CONFIDENCE:</strong> {confidence}%
        <br />
        🎯 <strong>STATUS:</strong> {status}
        <br />
        💡 <strong>RECOMMENDATION:</strong> {recommendation}
      </Typography>

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          📈 DETAILED PROBABILITIES:
        </Typography>
        {(["high", "medium", "low"] as const).map((key) => (
          <Box key={key} mb={1}>
            <Typography>{`${key.charAt(0).toUpperCase() + key.slice(1)} Stress: ${probabilities[key]}%`}</Typography>
            <LinearProgress
              variant="determinate"
              value={probabilities[key]}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#ddd",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getBarColor(key),
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          🔍 KEY FACTORS:
        </Typography>
        <Typography>• Work-Life Balance: {keyFactors.workLifeBalance}/5 {keyFactors.workLifeBalance <= 2 ? "⚠️ Critical!" : ""}</Typography>
        <Typography>• Overall Satisfaction: {keyFactors.satisfaction}/5</Typography>
        <Typography>• Company Culture: {keyFactors.culture}/5</Typography>
        <Typography>• Review Length: {keyFactors.reviewLength} characters</Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          💼 BUSINESS IMPACT:
        </Typography>
        <Typography>• Cost Estimate: {businessImpact.costEstimate}</Typography>
        <Typography>• ROI: {businessImpact.roi}</Typography>
        <Typography>• Timeline: {businessImpact.timeline}</Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          🔎 Reasoning:
        </Typography>
        {reasoning.map((r, idx) => (
          <Typography key={idx}>• {r}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ResultsPanel;
