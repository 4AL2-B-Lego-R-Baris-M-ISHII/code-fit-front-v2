import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import DtoExercise from "@/types/exercise/dto-exercise";
import { Ref, ref } from "vue";
import CreateExerciseRequest from "@/types/exercise/CreateExerciseRequest";

const exercises = ref<DtoExercise[]>([]);
export default function useExercise() {
  const EXERCISE_PATH = "/exercise";

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
      console.error(errorMessage);
      throw Error(errorMessage);
    }
  }

  async function deleteExercise(exerciseId: number): Promise<void> {
    await urlHelpers.sendNoContent(
      RequestMethod.DELETE,
      `${EXERCISE_PATH}/${exerciseId}`,
      undefined
    );
    exercises.value = exercises.value.filter(
      (exercise) => exerciseId !== exercise.id
    );
  }

  async function getOneExercise(exerciseId: number): Promise<DtoExercise> {
    try {
      const response = await urlHelpers.get(`${EXERCISE_PATH}/${exerciseId}`);
      if (response.ok) {
        return await response.json();
      }
      const text = await response.text();
      console.log(text);
      throw Error(text);
    } catch (err) {
      throw Error(err);
    }
  }

  return {
    exercises,
    getAllExercises,
    createExercise,
    deleteExercise,
    getOneExercise,
  };
}
