<template>
  <div class="exercise">
    <div class="exercise__header">
      <div>
        <h3>{{ exercise.title }}</h3>
      </div>

      <div class="creator">
        creator : <strong>{{ exercise.user.username }}</strong>
      </div>
    </div>
    <div class="exercise__body">
      <div class="description">{{ exercise.description }}</div>
      <div class="languages">
        <span
          v-for="name in languageNames"
          :key="name"
          :title="languageTitle(name)"
        >
          <img v-if="name === 'C11'" src="@/assets/img/language-c.png" />
          <img
            v-else-if="name === 'JAVA8'"
            src="@/assets/img/language-java.png"
          />
          <span v-else>{{ name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props) {
    const languageNames = computed(() => {
      return props.exercise.cases.map((curCase) => {
        return curCase.language.languageName;
      });
    });

    // TODO : tooltip on language icons
    const mapLanguageName = new Map([
      ["C11", "c"],
      ["JAVA8", "java"],
    ]);
    const languageTitle = (languageName: string) => {
      return mapLanguageName.get(languageName);
    };

    return { languageNames, languageTitle };
  },
});
</script>

<style lang="scss" scoped>
.exercise {
  margin: 0 1.5em;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__body {
    margin-bottom: 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .description {
      margin-right: 1em;
    }
    .languages {
      span {
        margin-right: 0.5em;
      }
      img {
        height: 2em;
        margin-right: 0.5em;
      }
    }
  }
}
</style>