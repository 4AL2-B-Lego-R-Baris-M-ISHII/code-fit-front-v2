<template>
  <div><ExerciseInfo :exercise="exercise" /></div>
</template>

<script lang="ts">
import useExercise from "@/composables/useExercise";
import { defineComponent, onMounted, ref } from "vue";
import DtoUser from "@/types/auth/dto-user";
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import ExerciseInfo from "@/components/exercise/ExerciseInfo.vue";
import router from "@/router";
import useErrorModal from "@/composables/useErrorModal";

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
  },
  components: {
    ExerciseInfo,
  },
  setup(props) {
    const { getOneExercise } = useExercise();
    const exercise = ref<DtoExercise>({
      title: "",
      description: "",
      user: {} as DtoUser,
      cases: {} as DtoExerciseCase[],
    } as DtoExercise);
    const { showErrorModal, messageError } = useErrorModal();
    onMounted(async () => {
      try {
        exercise.value = await getOneExercise(parseInt(props.exerciseId));
      } catch (err: any | Response) {
        if (err.status !== undefined && err.status === 404) {
          router.push("/404");
        } else {
          const errorResponse = err as Response;
          const check = await errorResponse.text();

          messageError.value = check.slice(check.indexOf(": ") + ": ".length);
          showErrorModal.value = true;
        }
      }
    });
    return { exercise };
  },
});
</script>

<style lang="scss" scoped>
</style>