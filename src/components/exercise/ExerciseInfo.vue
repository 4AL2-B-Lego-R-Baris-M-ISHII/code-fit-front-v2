<template>
  <section class="exercise-info">
    <h2>Exercise info</h2>
    <div class="exercise-info__group">
      <div>Title :</div>
      <div>{{ exercise.title }}</div>
    </div>
    <div class="exercise-info__group">
      <div>Description:</div>
      <div>{{ exercise.description }}</div>
    </div>
  </section>
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

<style lang="scss" scoped>
.exercise-info {
  margin: 0.5em 0;
  padding: 1em;
  border: solid;

  h2 {
    margin: 0 0.5em;
    margin-bottom: 0.5em;
  }

  &__group {
    display: flex;
    div {
      margin: 0.25em 0.5em;
    }
  }
}
</style>