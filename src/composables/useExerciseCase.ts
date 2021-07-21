import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import { ref } from "vue";

const currentExerciseCase = ref<DtoExerciseCase>({} as DtoExerciseCase);
export default function useExerciseCase() {
  const EXERCISE_PATH = "/exercise-case";

  return {
    currentExerciseCase,
  };
}
