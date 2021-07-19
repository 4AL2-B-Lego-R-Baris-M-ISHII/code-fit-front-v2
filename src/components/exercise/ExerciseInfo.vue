<template>
  <div>{{ exercise.title }}</div>
  <div>{{ exercise.user.username }}</div>
  <div>{{ exercise.description }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DtoExercise from "@/types/exercise/dto-exercise";

export default defineComponent({
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup() {
    return {};
  },
});
</script>
