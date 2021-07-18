<template>
  <div>
    <hr />
    <div v-for="exercise in exercises" :key="exercise.id">
      <ItemExercise
        :exercise="exercise"
        @exercise-deleted="exerciseDeletedHandle"
      />
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import { defineComponent, PropType } from "vue";
import ItemExercise from "@/components/exercise/ItemExercise.vue";
import useExercise from "@/composables/useExercise";

export default defineComponent({
  name: "ListExercise",
  components: {
    ItemExercise,
  },
  props: {
    exercises: {
      required: true,
      type: Array as PropType<DtoExercise[]>,
    },
  },
  setup(props) {
    const { exercises } = useExercise();
    async function exerciseDeletedHandle(exerciseId: number) {
      // console.log(exerciseId);
      // exercises.value.filter((exercise) => exerciseId !== exercise.id);
    }
    return {
      exerciseDeletedHandle,
    };
  },
});
</script>
