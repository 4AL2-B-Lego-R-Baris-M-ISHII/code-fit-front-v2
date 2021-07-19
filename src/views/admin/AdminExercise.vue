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

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: Number,
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
    onMounted(async () => {
      try {
        exercise.value = await getOneExercise(props.exerciseId);
      } catch (err) {
        console.error(err);
      }
    });
    return { exercise };
  },
});
</script>

<style lang="scss" scoped>
</style>