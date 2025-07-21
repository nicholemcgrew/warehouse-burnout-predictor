
export type EmployeeStatus = "REGULAR" | "PART_TIME" | "CONTRACT";

export interface EmployeeData {
  overall: number;
  workLife: number;
  culture: number;
  status: EmployeeStatus;
  location: string;
  review: string;
}
