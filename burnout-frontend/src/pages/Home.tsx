import React, { useState } from "react";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import StressForm from "../components/StressForm";
import ResultsPanel from "../components/ResultsPanel";
import mockPrediction from "../data/mockPredictions.json";
import { PredictionResponse } from "../types/prediction";

// Enhanced keyword categories
const stressKeywords = {
  burnout: ["burnout", "exhausted", "drained", "burnt out", "burned out"],
  physical: ["physically demanding", "heavy lifting", "sore", "pain", "tired", "back pain", "demanding"],
  management: ["micromanage", "micromanages", "bad manager", "terrible manager", "unfair", "biased", "boss sucks"],
  workload: ["overwhelmed", "too much work", "pressure", "quota", "unrealistic", "rushed", "overworked"],
  environment: ["toxic", "hostile", "negative", "culture", "favoritism", "politics", "discrimination"],
  emotional: ["hate", "awful", "terrible", "worst", "horrible", "disgusting", "miserable"]
};

const positiveKeywords = [
  "love", "great", "excellent", "amazing", "fantastic", "wonderful", "supportive", 
  "balanced", "happy", "flexible", "valued", "rewarding", "growth", "learning", 
  "healthy", "good culture", "empowered", "appreciated", "team", "benefits"
];

const analyzeKeywords = (review: string) => {
  const reviewLower = review.toLowerCase();
  const results = {
    stressScore: 0,
    positiveScore: 0,
    categories: [] as string[],
    detectedKeywords: [] as string[],
    reasoning: [] as string[]
  };

  // Count stress keywords by category
  Object.entries(stressKeywords).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => reviewLower.includes(keyword));
    if (found.length > 0) {
      results.stressScore += found.length;
      results.categories.push(category);
      results.detectedKeywords.push(...found);
      
      // Add specific reasoning
      switch (category) {
        case 'burnout':
          results.reasoning.push('Burnout indicators detected');
          break;
        case 'physical':
          results.reasoning.push('Physical stress symptoms mentioned');
          break;
        case 'management':
          results.reasoning.push('Management issues detected');
          break;
        case 'workload':
          results.reasoning.push('Workload stress indicators found');
          break;
        case 'environment':
          results.reasoning.push('Toxic work environment signals');
          break;
        case 'emotional':
          results.reasoning.push('Strong negative emotions detected');
          break;
      }
    }
  });

  // Count positive keywords
  const positiveFound = positiveKeywords.filter(keyword => reviewLower.includes(keyword));
  results.positiveScore = positiveFound.length;

  if (positiveFound.length > 0) {
    results.reasoning.push('Some positive sentiment detected');
  }

  // Emotional intensity check
  if (review.includes('!') || /[A-Z]{3,}/.test(review)) {
    results.stressScore += 0.5;
    results.reasoning.push('High emotional intensity detected');
  }

  return results;
};

const getPredictionFromValues = (
  overall: number,
  workLife: number,
  culture: number,
  review: string
): PredictionResponse => {
  const avgScore = (overall + workLife + culture) / 3;
  const reviewLength = review.trim().length;
  const keywordAnalysis = analyzeKeywords(review);

  // Calculate stress boost
  let stressBoost = 0;
  const reasoning: string[] = [];

  // Work-life balance is most important (based on your Python model)
  if (workLife <= 2) {
    stressBoost += 3;
    reasoning.push("Critical work-life balance issues");
  }

  // Overall satisfaction
  if (overall <= 2) {
    stressBoost += 2;
    reasoning.push("Low overall satisfaction");
  }

  // Company culture
  if (culture <= 2) {
    stressBoost += 1;
    reasoning.push("Poor company culture");
  }

  // Keyword-based stress boost
  stressBoost += keywordAnalysis.stressScore;
  reasoning.push(...keywordAnalysis.reasoning);

  // Positive keywords reduce stress
  stressBoost -= keywordAnalysis.positiveScore * 0.5;

  // Long negative reviews indicate more stress
  if (reviewLength > 100 && keywordAnalysis.stressScore > 0) {
    stressBoost += 1;
    reasoning.push("Detailed negative feedback indicates high stress");
  }

  // Determine stress level
  let stressLevel: "high" | "medium" | "low";
  let confidence: number;

  if (stressBoost >= 4 || (workLife <= 2 && keywordAnalysis.stressScore >= 2)) {
    stressLevel = "high";
    confidence = Math.min(85 + stressBoost * 2, 97);
  } else if (stressBoost >= 2 || avgScore <= 3) {
    stressLevel = "medium";
    confidence = 65 + stressBoost * 3;
  } else {
    stressLevel = "low";
    confidence = Math.max(75 + keywordAnalysis.positiveScore * 5, 80);
  }

  // Get base prediction and enhance it
  const basePrediction = mockPrediction[stressLevel];

  // Calculate probabilities
  const high = stressLevel === "high" ? confidence : Math.max(5, 100 - confidence - 20);
  const medium = stressLevel === "medium" ? confidence : Math.max(5, 25);
  const low = stressLevel === "low" ? confidence : Math.max(5, 100 - confidence - 10);
  
  const total = high + medium + low;

  // Create enhanced prediction with dynamic data
  const enhancedPrediction: PredictionResponse = {
    ...basePrediction,
    confidence: Math.round(confidence),
    reasoning: reasoning.length > 0 ? reasoning : basePrediction.reasoning,
    keyFactors: {
      workLifeBalance: workLife,
      satisfaction: overall,
      culture: culture,
      reviewLength: reviewLength
    },
    probabilities: {
      high: Math.round((high / total) * 100),
      medium: Math.round((medium / total) * 100),
      low: Math.round((low / total) * 100)
    }
  };

  // Ensure probabilities add to 100%
  const probTotal = enhancedPrediction.probabilities.high + 
                   enhancedPrediction.probabilities.medium + 
                   enhancedPrediction.probabilities.low;
  
  if (probTotal !== 100) {
    enhancedPrediction.probabilities.low = 100 - enhancedPrediction.probabilities.high - enhancedPrediction.probabilities.medium;
  }

  return enhancedPrediction;
};

const Home: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [formValues, setFormValues] = useState({
    overall: 3,
    workLife: 3,
    culture: 3,
    review: "",
  });
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handlePredict = () => {
    setShowResult(false);
    setTimeout(() => {
      // Use the enhanced prediction logic
      const dynamicResult = getPredictionFromValues(
        formValues.overall,
        formValues.workLife,
        formValues.culture,
        formValues.review
      );
      
      setResult(dynamicResult);
      setShowResult(true);
    }, 1500); // Slightly longer delay for more realistic feel
  };

  return (
    <Box
      minHeight="100vh"
      bgcolor="#232F3E"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <CssBaseline />
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ maxWidth: "1200px" }}
      >
        <Grid item xs={12} md={showResult ? 6 : 8}>
          <Box
            p={2}
            bgcolor="#ffffff"
            borderRadius={3}
            boxShadow="0 3px 20px rgba(0,0,0,0.08)"
          >
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              color="#232f3e"
              mb={1}
            >
              AMAZON WORKER STRESS PREDICTION SYSTEM
            </Typography>
            <Typography align="center" mb={2} sx={{ color: "#37475a" }}>
              🤖 AI-Powered Burnout Detector
            </Typography>

            <StressForm
              values={formValues}
              setValues={setFormValues}
              onSubmit={handlePredict}
            />
          </Box>
        </Grid>

        {showResult && result && (
          <Grid item xs={12} md={6}>
            <ResultsPanel result={result} form={formValues} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;