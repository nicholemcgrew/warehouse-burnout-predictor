export const getReviewLength = (review: string): number => {
  return review.trim().length;
};

export const getKeyFactors = (form: {
  workLife: number;
  overall: number;
  culture: number;
}): string[] => {
  const factors: string[] = [];

  if (form.workLife <= 2) {
    factors.push("Work-Life Balance: ⚠️ Critical Factor!");
  }

  if (form.overall <= 2) {
    factors.push("Overall Satisfaction: Low");
  }

  if (form.culture <= 2) {
    factors.push("Company Culture: Needs Improvement");
  }

  return factors;
};
