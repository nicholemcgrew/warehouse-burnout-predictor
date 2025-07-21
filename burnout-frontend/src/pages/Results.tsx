import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import mockPredictions from "../data/mockPredictions.json";

interface PredictionData {
  prediction: string;
  confidence: number;
  status: string;
  recommendation: string;
  reasoning: string[];
  keyFactors: {
    workLifeBalance: number;
    satisfaction: number;
    culture: number;
    reviewLength: number;
  };
  businessImpact: {
    costEstimate: string;
    roi: string;
    timeline: string;
  };
  probabilities: {
    high: number;
    medium: number;
    low: number;
  };
}

const Results = ({ stressLevel }: { stressLevel: "high" | "medium" | "low" }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PredictionData | null>(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setResult(mockPredictions[stressLevel]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [stressLevel]);

  if (loading || !result) {
    return (
      <Box mt={4}>
        <Typography variant="h6">🔄 Analyzing employee data...</Typography>
        <CircularProgress sx={{ mt: 2 }} />
      </Box>
    );
  }

  return (
    <Box mt={4} sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
      <Typography variant="h5">🎯 PREDICTION RESULTS</Typography>
      <Typography mt={2}>==================================================</Typography>
      <Typography>🚨 STRESS LEVEL: {result.prediction}</Typography>
      <Typography>📊 CONFIDENCE: {result.confidence}%</Typography>
      <Typography>🎯 STATUS: {result.status}</Typography>
      <Typography>💡 ACTION: {result.recommendation}</Typography>

      <Typography mt={3}>🧠 AI REASONING:</Typography>
      {result.reasoning.map((r, i) => (
        <Typography key={i}>   {r}</Typography>
      ))}

      <Typography mt={3}>🔍 KEY FACTOR ANALYSIS:</Typography>
      <Typography>   • Work-Life Balance: {result.keyFactors.workLifeBalance}/5</Typography>
      <Typography>   • Overall Satisfaction: {result.keyFactors.satisfaction}/5</Typography>
      <Typography>   • Company Culture: {result.keyFactors.culture}/5</Typography>
      <Typography>   • Review Sentiment: {result.keyFactors.reviewLength} characters</Typography>

      <Typography mt={3}>💼 BUSINESS RECOMMENDATIONS:</Typography>
      <Typography>   🔴 ESTIMATED COST: {result.businessImpact.costEstimate}</Typography>
      <Typography>   📈 ROI: {result.businessImpact.roi}</Typography>
      <Typography>   ⏰ Timeline: {result.businessImpact.timeline}</Typography>

      <Typography mt={3}>📈 DETAILED PROBABILITIES:</Typography>
      <Typography>   High Stress : {result.probabilities.high}% {"█".repeat(result.probabilities.high / 5)}</Typography>
      <Typography>   Medium Stress : {result.probabilities.medium}% {"█".repeat(result.probabilities.medium / 5)}</Typography>
      <Typography>   Low Stress : {result.probabilities.low}% {"█".repeat(result.probabilities.low / 5)}</Typography>
    </Box>
  );
};

export default Results;
