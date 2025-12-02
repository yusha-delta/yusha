export interface GradeOption {
  label: string;
  points: number;
  emoji: string;
  gifUrl: string; // URL for the reaction GIF
  color: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  gradePoints: number; // The numeric value of the selected grade
}

export interface CalculationResult {
  gpa: number;
  totalCredits: number;
  totalPoints: number; // Added for formula display
  emoji: string;
  gifUrl: string;
  moodColor: string;
  moodDescription: string;
}

export interface AdviceResponse {
  advice: string[];
}