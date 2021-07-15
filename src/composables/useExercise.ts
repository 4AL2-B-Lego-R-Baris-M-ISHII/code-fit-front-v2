import urlHelpers from "@/helpers/UrlHelpers";
import DtoExercise from "@/types/exercise/dto-exercise";
import { Ref, ref } from "vue";
import CreateExerciseRequest from "@/types/exercise/CreateExerciseRequest";

export default function useExercise() {
  const EXERCISE_PATH = "/exercise";
  const exercises = ref<DtoExercise[]>([]);

  async function getAllExercises(): Promise<Ref<DtoExercise[]>> {
    try {
      const response = await urlHelpers.get(EXERCISE_PATH);
      exercises.value = await response.json();
    } catch (err) {
      throw new Error(err);
    }

    return Promise.resolve(exercises);
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
      console.error(errorMessage);
      throw Error(errorMessage);
    }
  }

  return { exercises, getAllExercises, createExercise };
}
