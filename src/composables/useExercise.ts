import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoLanguage from "@/types/language/dto-language";
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
  ) {
    try {
      const body = {
        title,
        description,
        language: languageName,
      } as CreateExerciseRequest;
      const response = await urlHelpers.post(EXERCISE_PATH, body);
      console.log("toto");
      console.log(response);
      return null;
    } catch (err) {
      console.error(`error create request : ${err}`);
    }
    return null;
  }

  return { exercises, getAllExercises, createExercise };
}
