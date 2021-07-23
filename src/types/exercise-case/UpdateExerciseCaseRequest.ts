import DtoExerciseTest from "../exercise-test/dto-exercise-test";
import DtoLanguage from "../language/dto-language";

interface UpdateExerciseCaseRequest {
  language: DtoLanguage;
  solution: string;
  startContent: string;
  tests: DtoExerciseTest[];
  verifyCode: boolean;
}

export default UpdateExerciseCaseRequest;
