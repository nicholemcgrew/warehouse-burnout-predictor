
import { useState } from "react";
import type { EmployeeData } from "../types/employee";
import type { PredictionResponse } from "../types/prediction";

export const usePredict = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predictStress = async (data: EmployeeData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setError("Failed to predict stress level.");
    } finally {
      setLoading(false);
    }
  };

  return { predictStress, result, loading, error };
};
