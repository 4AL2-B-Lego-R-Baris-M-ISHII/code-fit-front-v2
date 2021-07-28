import DtoUser from "../auth/dto-user";
import DtoExerciseCase from "../exercise-case/dto-exercise-case";

interface DtoExercise {
  id: number;
  description: string;
  title: string;
  user: DtoUser;
  cases: DtoExerciseCase[];
}

export default DtoExercise;
