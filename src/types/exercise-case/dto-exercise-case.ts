import DtoExerciseTest from "../exercise-test/dto-exercise-test";
import DtoLanguage from "../language/dto-language";

interface DtoExerciseCase {
  id: number;
  isValid: boolean;
  language: DtoLanguage;
  solution: string;
  startContent: string;
  tests: DtoExerciseTest[];
}

export default DtoExerciseCase;
