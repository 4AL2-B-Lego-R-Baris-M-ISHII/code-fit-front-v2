import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import { ref } from "vue";
import urlHelpers from "@/helpers/UrlHelpers";
import CreateExerciseCaseRequest from "@/types/exercise-case/CreateExerciseCaseRequest";

const currentExerciseCase = ref<DtoExerciseCase>({} as DtoExerciseCase);
export default function useExerciseCase() {
  const EXERCISE_CASE_PATH = "/exercise-case";

  async function createExerciseCase(
    exerciseId: number,
    languageId: number
  ): Promise<number> {
    try {
      const body = {
        exerciseId,
        languageId,
      } as CreateExerciseCaseRequest;
      return await urlHelpers.post(EXERCISE_CASE_PATH, body);
    } catch (err) {
      const errorMessage = `error create exercise case request : ${err}`;
      throw Error(errorMessage);
    }
  }

  return {
    currentExerciseCase,
    createExerciseCase,
  };
}
