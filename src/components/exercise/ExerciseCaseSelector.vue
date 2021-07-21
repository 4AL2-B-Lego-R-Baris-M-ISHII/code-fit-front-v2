<template>
  <div class="exercise-case-selector">
    <div class="exercise-case-selector__title">
      Select exercise case by language
    </div>
    <div>
      <div class="cases-languages">
        <select>
          <option v-for="language in languageNames" :key="language">
            {{ language }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import DtoExercise from "@/types/exercise/dto-exercise";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    exercise: {
      type: Object as PropType<DtoExercise>,
    },
    selectedExerciseCase: {
      type: Object as PropType<DtoExerciseCase>,
    },
  },
  setup(props) {
    const languageNames = computed(() => {
      if (props.exercise === undefined || props.exercise.cases === undefined)
        return [];
      return props.exercise.cases.map((curCase) => {
        return curCase.language.languageName;
      });
    });

    //const languageName = computed();

    return { languageNames };
  },
});
</script>

<style lang="scss" scoped>
.exercise-case-selector {
  display: flex;

  &__title {
    margin: 0 1em;
  }
}
</style>