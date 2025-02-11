export type SetData = {
  weight: string;
  reps: string;
};

export type Exercise = {
  name: string;
  sets: SetData[];
};

export type Training = {
  id: string;
  userId: string;
  trainingDay: string;
  exercises: Exercise[];
};

export type TrainingListResponse = {
  trainings: Training[];
};
