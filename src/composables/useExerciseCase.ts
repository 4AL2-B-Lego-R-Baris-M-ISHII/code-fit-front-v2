import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import { ref } from "vue";
import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import CreateExerciseCaseRequest from "@/types/exercise-case/CreateExerciseCaseRequest";
import UpdateExerciseCaseRequest from "@/types/exercise-case/UpdateExerciseCaseRequest";

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

  async function getOneExerciseCase(
    exerciseCaseId: number
  ): Promise<DtoExerciseCase> {
    try {
      const response = await urlHelpers.get(
        `${EXERCISE_CASE_PATH}/${exerciseCaseId}`
      );
      if (response.ok) {
        return await response.json();
      }
      const errorMessage = await response.text();
      throw errorMessage;
    } catch (err) {
      const errorMessage = `error find exercise case by id '${exerciseCaseId}'`;
      throw Error(errorMessage);
    }
  }

  async function deleteExerciseCase(exerciseCaseId: number) {
    try {
      await urlHelpers.sendNoContent(
        RequestMethod.DELETE,
        `${EXERCISE_CASE_PATH}/${exerciseCaseId}`,
        undefined
      );
    } catch (err) {
      const errorMessage = `error delete exercise case by id '${exerciseCaseId}'`;
      throw Error(errorMessage);
    }
  }

  async function updateExerciseCase(exerciseCase: DtoExerciseCase) {
    try {
      const body = {
        language: exerciseCase.language,
        solution: exerciseCase.solution,
        startContent: exerciseCase.startContent,
        tests: exerciseCase.tests,
        verifyCode: false,
      } as UpdateExerciseCaseRequest;
      await urlHelpers.sendNoContent(
        RequestMethod.PUT,
        `${EXERCISE_CASE_PATH}/${exerciseCase.id}`,
        body
      );
    } catch (err) {
      const errorMessage = `Error update exercise case. Reason : ${err}`;
      throw Error(errorMessage);
    }
  }

  async function updateAndVerifyExerciseCase(exerciseCase: DtoExerciseCase) {
    try {
      const body = {
        language: exerciseCase.language,
        solution: exerciseCase.solution,
        startContent: exerciseCase.startContent,
        tests: exerciseCase.tests,
        verifyCode: true,
      } as UpdateExerciseCaseRequest;
      const result = await urlHelpers.send(
        RequestMethod.PUT,
        `${EXERCISE_CASE_PATH}/${exerciseCase.id}`,
        body
      );
    } catch (err) {
      const errorMessage = `Error update exercise case. Reason : ${err}`;
      throw Error(errorMessage);
    }
  }

  return {
    currentExerciseCase,
    createExerciseCase,
    getOneExerciseCase,
    deleteExerciseCase,
    updateExerciseCase,
    updateAndVerifyExerciseCase,
  };
}
