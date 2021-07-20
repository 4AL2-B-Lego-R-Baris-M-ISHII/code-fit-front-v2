<template>
  <div>
    <ExerciseInfo :exercise="exercise" @exercise-edited="updateExercise" />
  </div>
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
      exercise.value.title = title;
      exercise.value.description = description;
    };
    return { exercise, updateExercise };
  },
});
</script>

<style lang="scss" scoped>
</style>