<template>
  <div>
    <hr />
    <div v-for="exercise in exercises" :key="exercise.id">
      <ItemExercise :exercise="exercise" />
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import { defineComponent, PropType } from "vue";
import ItemExercise from "@/components/exercise/ItemExercise.vue";

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
});
</script>
