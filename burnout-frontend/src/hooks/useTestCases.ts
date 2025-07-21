import type { EmployeeData } from "../types/employee";

export const testCases: Record<string, EmployeeData> = {
  stressed: {
    overall: 2,
    workLife: 1,
    culture: 2,
    status: "REGULAR",
    location: "California",
    review:
      "OMG I hate this job. The manager micromanages and the workload is exhausting!",
  },
  moderate: {
    overall: 3,
    workLife: 3,
    culture: 3,
    status: "PART_TIME",
    location: "Texas",
    review: "The work is demanding, but the benefits are okay.",
  },
  happy: {
    overall: 5,
    workLife: 4,
    culture: 5,
    status: "CONTRACT",
    location: "Ontario, Canada",
    review: "Love working here! Great team and flexibility.",
  },
};
