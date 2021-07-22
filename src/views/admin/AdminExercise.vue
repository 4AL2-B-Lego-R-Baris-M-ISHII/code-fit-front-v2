<template>
  <div>
    <ExerciseInfo
      :exercise="currentExercise"
      @exercise-edited="updateExercise"
    />
    <ExerciseCaseSelector
      :exercise="currentExercise"
      :selectedExerciseCase="currentExerciseCase"
      @exerciseCaseCreated="addExerciseCase"
      @selectedExerciseCaseUpdated="updateSelectedExerciseCase"
      @exerciseCaseDeleted="removeExerciseCaseOfExercise"
    />

    <div class="start-content">
      <h3>Start content</h3>
      <CodeEditor
        :defaultContent="startContent"
        :language="currentLanguage"
        :id="'start-content-editor'"
      />
    </div>
    <div class="solution">
      <h3>Solution</h3>
      <CodeEditor
        :defaultContent="solution"
        :language="currentLanguage"
        :id="'solution-editor'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router";

import useExercise from "@/composables/useExercise";
import useExerciseCase from "@/composables/useExerciseCase";
import useErrorModal from "@/composables/useErrorModal";

import ExerciseInfo from "@/components/exercise/ExerciseInfo.vue";
import ExerciseCaseSelector from "@/components/exercise/ExerciseCaseSelector.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import useLoading from "@/composables/useLoading";

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
  },
  components: {
    ExerciseInfo,
    ExerciseCaseSelector,
    CodeEditor,
  },
  setup(props) {
    const { getOneExercise, currentExercise } = useExercise();
    const { currentExerciseCase, getOneExerciseCase } = useExerciseCase();
    const { showErrorModal, messageError } = useErrorModal();
    const { isLoading } = useLoading();
    const currentLanguage = ref("");
    const startContent = ref("");
    const solution = ref("");

    onMounted(async () => {
      try {
        await findExercise();
        currentExerciseCase.value = currentExercise.value.cases[0];
        currentLanguage.value = currentExerciseCase.value.language.languageName;
        startContent.value = currentExerciseCase.value.startContent;
        solution.value = currentExerciseCase.value.solution;
      } catch (err: any | Response) {
        if (err.status !== undefined && err.status === 404) {
          router.push("/404");
        } else {
          if (typeof err === "string") {
            if (err.startsWith("[404]")) {
              router.push("/404");
              return;
            }
            messageError.value = err;
          } else {
            const errorResponse = err as Response;
            messageError.value = await errorResponse.text();
          }

          showErrorModal.value = true;
        }
      }
    });

    const findExercise = async () => {
      await getOneExercise(parseInt(props.exerciseId));
    };
    const updateExercise = (title: string, description: string) => {
      if (currentExercise.value === undefined) {
        return;
      }

      currentExercise.value.title = title;
      currentExercise.value.description = description;
    };

    const addExerciseCase = async (exerciseCaseId: number) => {
      try {
        const foundExerciseCase = await getOneExerciseCase(exerciseCaseId);
        currentExercise.value.cases.push(foundExerciseCase);
        currentExerciseCase.value = foundExerciseCase;
        startContent.value = foundExerciseCase.startContent;
        solution.value = foundExerciseCase.solution;
        isLoading.value = false;
      } catch (err) {
        console.error(err);
      }
    };
    const updateSelectedExerciseCase = (exerciseCase: DtoExerciseCase) => {
      currentExerciseCase.value = exerciseCase;
      startContent.value = exerciseCase.startContent;
      solution.value = exerciseCase.solution;
    };

    const removeExerciseCaseOfExercise = (exerciseCaseId: number) => {
      const cases = currentExercise.value.cases.filter((curCase) => {
        return curCase.id !== exerciseCaseId;
      });
      currentExercise.value.cases = cases;
      currentExerciseCase.value = cases[0];
      isLoading.value = false;
    };

    return {
      currentExercise,
      updateExercise,
      currentExerciseCase,
      startContent,
      currentLanguage,
      findExercise,
      addExerciseCase,
      updateSelectedExerciseCase,
      removeExerciseCaseOfExercise,
      solution,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>