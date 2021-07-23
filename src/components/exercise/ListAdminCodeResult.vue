<template>
  <div>
    <h3>Output</h3>
    <div>{{ listCodeResult }}</div>
  </div>
</template>

<script lang="ts">
import DtoVerifyExerciseCase from "@/types/exercise-case/dto-verify-exercise-case";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    listCodeResult: {
      default: [] as PropType<DtoVerifyExerciseCase[]>,
      type: Object as PropType<DtoVerifyExerciseCase[]>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>