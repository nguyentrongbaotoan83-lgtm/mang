
export interface UserData {
  name: string;
  className: string;
}

export interface Question {
  q: string;
  options: string[];
  answer: string;
  score: number;
}

export interface QuizActivityData {
  id: number;
  activity: string;
  questions: Question[];
}

export interface ActivityScore {
  score: number;
  time: number;
  attempts: number;
  finished: boolean;
}

export type Scores = Record<string, ActivityScore>;

// FIX: Changed SessionData to contain scores instead of extending Scores to avoid type conflicts with the index signature.
export interface SessionData {
  scores: Scores;
  totalScore: number;
  totalTime: number;
  allFinished: boolean;
}

export interface LocalSubmission {
  name: string;
  className: string;
  totalScore: number;
  totalTime: number;
  timestamp: string;
  attempts: number;
}

export interface FirestoreSubmission {
  id: string;
  name: string;
  className: string;
  totalScore: number;
  totalTime: number;
  totalCorrect: number;
  activity1: ActivityScore;
  activity2: ActivityScore;
  activity3: ActivityScore;
  submissionTime: { toDate: () => Date };
  attempts: number;
}