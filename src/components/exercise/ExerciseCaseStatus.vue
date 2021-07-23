<template>
  <div class="exercise-case-status">
    Status :
    <div class="current-status">
      <div v-if="selectedExerciseCase.isValid === true" class="valid-status">
        Valid
      </div>
      <div v-else class="not-valid-status">Not valid</div>
    </div>
  </div>
</template>


<script lang="ts">
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    selectedExerciseCase: {
      type: Object as PropType<DtoExerciseCase>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.exercise-case-status {
  display: flex;
  .current-status {
    margin-left: 0.5em;
    .valid-status {
      color: #42b883b0;
      font-weight: bold;
    }
    .not-valid-status {
      color: #b8424291;
      font-weight: bold;
    }
  }
}
</style>