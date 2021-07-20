import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import DtoExercise from "@/types/exercise/dto-exercise";
import { Ref, ref } from "vue";
import CreateExerciseRequest from "@/types/exercise/CreateExerciseRequest";
import useErrorModal from "./useErrorModal";

const exercises = ref<DtoExercise[]>([]);
export default function useExercise() {
  const EXERCISE_PATH = "/exercise";
  const { openErrorModal } = useErrorModal();

  async function getAllExercises(): Promise<Ref<DtoExercise[]>> {
    try {
      const response = await urlHelpers.get(EXERCISE_PATH);
      exercises.value = await response.json();
    } catch (err) {
      throw new Error(err);
    }

    return exercises;
  }

  async function createExercise(
    title: string,
    description: string,
    languageName: string
  ): Promise<number> {
    try {
      const body = {
        title,
        description,
        language: languageName,
      } as CreateExerciseRequest;
      return await urlHelpers.post(EXERCISE_PATH, body);
    } catch (err) {
      const errorMessage = `error create exercise request : ${err}`;
      throw Error(errorMessage);
    }
  }

  async function deleteExercise(exerciseId: number): Promise<void> {
    try {
      await urlHelpers.sendNoContent(
        RequestMethod.DELETE,
        `${EXERCISE_PATH}/${exerciseId}`,
        undefined
      );
      exercises.value = exercises.value.filter(
        (exercise) => exerciseId !== exercise.id
      );
    } catch (err) {
      let errorMessage = "";
      if (typeof err === "string") {
        errorMessage = err as string;
      } else {
        const errorResponse = err as Response;
        errorMessage = await errorResponse.text();
      }
      openErrorModal(errorMessage);
    }
  }

  async function getOneExercise(
    exerciseId: number
  ): Promise<DtoExercise | never> {
    const response = await urlHelpers.get(`${EXERCISE_PATH}/${exerciseId}`);
    if (response.ok) {
      return await response.json();
    }
    throw response;
  }

  async function updateExercise(
    exerciseId: number,
    title: string,
    description: string
  ) {
    try {
      await urlHelpers.sendNoContent(
        RequestMethod.PUT,
        `${EXERCISE_PATH}/${exerciseId}`,
        { title, description }
      );
    } catch (err) {
      if (typeof err === "string") {
        throw err;
      }
      const errorResponse = err as Response;
      if (errorResponse.status === 400) {
        throw "Invalid title or description value, those values have to be not empty";
      }
    }
  }

  return {
    exercises,
    getAllExercises,
    createExercise,
    deleteExercise,
    getOneExercise,
    updateExercise,
  };
}
