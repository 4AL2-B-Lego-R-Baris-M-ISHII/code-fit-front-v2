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
    />

    <h3>Start content</h3>
    <CodeEditor :defaultContent="startContent" :language="currentLanguage" />
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
    const currentLanguage = ref("");
    const startContent = ref("");

    onMounted(async () => {
      try {
        await findExercise();
        currentExerciseCase.value = currentExercise.value.cases[0];
        currentLanguage.value = currentExerciseCase.value.language.languageName;
        startContent.value = currentExerciseCase.value.startContent;
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
      } catch (err) {
        console.error(err);
      }
    };
    const updateSelectedExerciseCase = (exerciseCase: DtoExerciseCase) => {
      currentExerciseCase.value = exerciseCase;
      startContent.value = exerciseCase.startContent;
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
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
}
.languages {
  margin-left: 1em;
  span {
    margin-right: 0.5em;
  }
  img {
    height: 3em;
    margin: 0.5em;
  }
}
</style>