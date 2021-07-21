<template>
  <div>
    <ExerciseInfo
      :exercise="currentExercise"
      @exercise-edited="updateExercise"
    />
    <ExerciseCaseSelector :exercise="currentExercise" />

    <h3>Start content</h3>
    <CodeEditor :defaultContent="currentExerciseCase.startContent" />
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
    const { currentExerciseCase } = useExerciseCase();
    const { showErrorModal, messageError } = useErrorModal();
    const content = ref("default!!!!");

    onMounted(async () => {
      try {
        await getOneExercise(parseInt(props.exerciseId));
        currentExerciseCase.value = currentExercise.value.cases[0];
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

    const updateExercise = (title: string, description: string) => {
      if (currentExercise.value === undefined) {
        console.warn("current exercise undefined");
        return;
      }

      currentExercise.value.title = title;
      currentExercise.value.description = description;
    };
    return {
      currentExercise,
      updateExercise,
      content,
      currentExerciseCase,
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