import urlHelpers from "@/helpers/UrlHelpers";
import DtoExercise from "@/types/exercise/dto-exercise";
import { Ref, ref } from "vue";

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

  return { exercises, getAllExercises };
}
