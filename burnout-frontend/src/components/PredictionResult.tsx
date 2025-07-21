import { Box, Typography, Divider } from "@mui/material";

const PredictionResult = () => {
  return (
    <Box sx={{ mt: 4, bgcolor: "#f9f9f9", p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        🔄 Analyzing employee data...
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🎯 PREDICTION RESULTS
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        🚨 STRESS LEVEL: <strong>High Stress</strong>
      </Typography>
      <Typography>
        📊 CONFIDENCE: <strong>95.0%</strong>
      </Typography>
      <Typography>
        🎯 STATUS: <strong>CRITICAL - RED ALERT</strong>
      </Typography>
      <Typography>
        💡 ACTION: <strong>🔴 IMMEDIATE INTERVENTION REQUIRED</strong>
      </Typography>

      <Typography sx={{ mt: 3, fontWeight: "bold" }}>
        🧠 AI REASONING:
      </Typography>
      <Typography>🔥 Stress boost applied: +6.5 points</Typography>
      <Typography>📋 Detected issues:</Typography>
      <Typography sx={{ ml: 2 }}>• Strong negative emotion detected</Typography>
      <Typography sx={{ ml: 2 }}>• Management issues detected</Typography>
      <Typography sx={{ ml: 2 }}>• Multiple stress keywords found</Typography>
      <Typography sx={{ ml: 2 }}>
        • Low ratings + detailed complaints
      </Typography>
      <Typography sx={{ ml: 2 }}>• High emotional intensity</Typography>
      <Typography>⚡ Enhanced algorithm override used</Typography>

      <Typography sx={{ mt: 3, fontWeight: "bold" }}>
        🔍 KEY FACTOR ANALYSIS:
      </Typography>
      <Typography>• Work-Life Balance: 1/5 (🚨 CRITICAL!)</Typography>
      <Typography>• Overall Satisfaction: 2/5 (🚨)</Typography>
      <Typography>• Company Culture: 2/5 (🚨)</Typography>
      <Typography>
        • Review Sentiment: 108 characters (🚨 Very Negative)
      </Typography>

      <Typography sx={{ mt: 3, fontWeight: "bold" }}>
        💼 BUSINESS RECOMMENDATIONS:
      </Typography>
      <Typography>🔴 URGENT ACTIONS:</Typography>
      <Typography sx={{ ml: 2 }}>
        • Schedule immediate 1-on-1 with manager
      </Typography>
      <Typography sx={{ ml: 2 }}>
        • Review workload and redistribute if possible
      </Typography>
      <Typography sx={{ ml: 2 }}>
        • Offer flexible schedule or time off
      </Typography>
      <Typography sx={{ ml: 2 }}>
        • Assess manager-employee relationship
      </Typography>
      <Typography sx={{ ml: 2 }}>
        • Provide stress management resources
      </Typography>
      <Typography sx={{ ml: 2 }}>
        • Consider internal transfer opportunities
      </Typography>

      <Typography sx={{ mt: 3, fontWeight: "bold" }}>
        💰 ESTIMATED BUSINESS IMPACT:
      </Typography>
      <Typography>📉 Cost of losing this employee: $15,000-25,000</Typography>
      <Typography>📈 Early intervention ROI: 300-500%</Typography>
      <Typography>⏰ Intervention timeline: Immediate (0–7 days)</Typography>
    </Box>
  );
};

export default PredictionResult;
