import type { EmployeeData } from "../types/employee";

import type { PredictionResponse } from "../types/prediction";

export const fetchPrediction = async (
  data: EmployeeData
): Promise<PredictionResponse> => {
  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return res.json();
};
