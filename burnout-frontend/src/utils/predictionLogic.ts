import { StressLevels } from "../data/stressLevels";
import { PredictionResponse } from "../types";

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

export const getReviewLength = (review: string): number => {
  return review.trim().length;
};

export const analyzeKeywords = (review: string) => {
  const reviewLower = review.toLowerCase();
  const results = {
    stressScore: 0,
    positiveScore: 0,
    categories: [],
    detectedKeywords: [],
    reasoning: []
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

export const getKeyFactors = (form: {
  overall: number;
  workLife: number;
  culture: number;
  review: string;
}) => {
  const factors: string[] = [];
  
  // Rating-based factors
  if (form.overall <= 2) factors.push("Low overall satisfaction");
  if (form.workLife <= 2) factors.push("Poor work-life balance");
  if (form.culture <= 2) factors.push("Negative company culture");

  // Keyword analysis
  const keywordAnalysis = analyzeKeywords(form.review);
  factors.push(...keywordAnalysis.reasoning);

  return factors;
};

export const getPredictionFromValues = (
  overall: number,
  workLife: number,
  culture: number,
  review: string
): PredictionResponse => {
  const avgScore = (overall + workLife + culture) / 3;
  const reviewLength = getReviewLength(review);
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
  let predictionLevel: keyof typeof StressLevels;
  let confidence: number;

  if (stressBoost >= 4 || (workLife <= 2 && keywordAnalysis.stressScore >= 2)) {
    predictionLevel = "high";
    confidence = Math.min(85 + stressBoost * 2, 97);
  } else if (stressBoost >= 2 || avgScore <= 3) {
    predictionLevel = "medium";
    confidence = 65 + stressBoost * 3;
  } else {
    predictionLevel = "low";
    confidence = Math.max(75 + keywordAnalysis.positiveScore * 5, 80);
  }

  // Get base prediction and enhance it
  const basePrediction = StressLevels[predictionLevel];

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
      high: predictionLevel === "high" ? confidence : Math.max(5, 100 - confidence - 20),
      medium: predictionLevel === "medium" ? confidence : Math.max(5, 25),
      low: predictionLevel === "low" ? confidence : Math.max(5, 100 - confidence - 10)
    }
  };

  // Normalize probabilities to 100%
  const total = enhancedPrediction.probabilities.high + 
                enhancedPrediction.probabilities.medium + 
                enhancedPrediction.probabilities.low;
  
  enhancedPrediction.probabilities.high = Math.round((enhancedPrediction.probabilities.high / total) * 100);
  enhancedPrediction.probabilities.medium = Math.round((enhancedPrediction.probabilities.medium / total) * 100);
  enhancedPrediction.probabilities.low = 100 - enhancedPrediction.probabilities.high - enhancedPrediction.probabilities.medium;

  return enhancedPrediction;
};