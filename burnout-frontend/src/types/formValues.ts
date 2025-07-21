export type EmployeeStatus = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMP";

export interface FormValues {
  overall: number;
  workLife: number;
  culture: number;
  status: EmployeeStatus;
  location: string;
  review: string;
}
