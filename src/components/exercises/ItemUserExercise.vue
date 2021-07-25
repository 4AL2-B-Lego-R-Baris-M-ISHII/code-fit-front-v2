<template>
  <div class="item-user-exercise" @click="openModal">
    <div class="item-user-exercise__header">
      <div class="item-user-exercise__header__title-and-validation">
        <h3>{{ exercise.title }}</h3>
        <div class="resolved" v-if="checkExerciseOneResolveCase">
          <font-awesome-icon :icon="faCheck" />Resolved
        </div>
      </div>

      <div class="creator">
        Creator : <strong>{{ exercise.user.username }}</strong>
      </div>
    </div>
    <div class="item-user-exercise__body">
      <div>{{ exercise.description }}</div>
      <div class="languages">
        <span v-for="exerciseCase in exercise.cases" :key="exerciseCase.id">
          <img
            v-if="exerciseCase.language.languageName === 'C11'"
            src="@/assets/img/languages/c.svg"
            title="C"
          />
          <img
            v-else-if="exerciseCase.language.languageName === 'JAVA8'"
            src="@/assets/img/languages/java.svg"
            title="Java"
          />
          <span v-else>{{ exerciseCase.language.languageName }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import DtoCode from "@/types/code/dto-code";

export default defineComponent({
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props) {
    const checkExerciseOneResolveCase = computed(() => {
      return props.exercise.cases.some((curCase: any) => {
        return (
          curCase.codes !== null &&
          curCase.codes.some((code: DtoCode) => code.isResolved)
        );
      });
    });

    const openModal = () => {
      console.log("open modal");
    };

    return { faCheck, checkExerciseOneResolveCase, openModal };
  },
});
</script>

<style lang="scss" scoped>
.item-user-exercise {
  padding: 0 0.5em;
  cursor: pointer;
  &__header {
    margin: 0 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title-and-validation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .resolved {
        margin-left: 1em;
        :first-child {
          margin: 0 0.5em;
        }
      }
    }
  }

  &__body {
    margin: 1em;
    display: flex;
    justify-content: space-between;
  }
}
</style>