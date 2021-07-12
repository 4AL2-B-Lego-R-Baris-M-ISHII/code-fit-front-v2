import DtoExerciseCase from "../exercise-case/dto-exercise-case";

interface DtoExercise {
  id: number;
  description: string;
  title: string;
  userId: number;
  cases: DtoExerciseCase[];
}

export default DtoExercise;
