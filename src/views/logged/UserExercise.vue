<template>User exercise</template>

<script lang="ts">
import useExercise from "@/composables/useExercise";
import { defineComponent, onMounted } from "vue";
import router from "@/router";
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import useExerciseCase from "@/composables/useExerciseCase";
import useErrorModal from "@/composables/useErrorModal";

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
    exerciseCaseId: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { getOneExercise, currentExercise } = useExercise();
    const { currentExerciseCase } = useExerciseCase();
    const { openErrorModal, openErrorModalWithTitle } = useErrorModal();
    // console.log(props.exerciseId);
    // console.log(props.exerciseCaseId);
    onMounted(async () => {
      const exerciseId = parseInt(props.exerciseId);
      const exerciseCaseId = parseInt(props.exerciseCaseId);
      if (isNaN(exerciseId) || isNaN(exerciseCaseId)) {
        openErrorModalWithTitle(
          "Problem",
          "Problem with properties of exercise id or exercise case id, they have to be numbers."
        );
        return;
      }
      await searchExerciseAndCase(exerciseId, exerciseCaseId);
    });

    async function searchExerciseAndCase(
      exerciseId: number,
      exerciseCaseId: number
    ) {
      try {
        await getOneExercise(exerciseId);
        const foundExerciseCase = currentExercise.value.cases.find(
          (curCase: DtoExerciseCase) => curCase.id === exerciseCaseId
        );
        if (foundExerciseCase === undefined) {
          router.push("/404");
          return;
        }
      } catch (err) {
        if (typeof err === "string") {
          if (err.startsWith("[404]")) {
            router.push("/404");
            return;
          }
        }
        const response = err as Response;
        openErrorModal(await response.text());
      }
    }

    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>