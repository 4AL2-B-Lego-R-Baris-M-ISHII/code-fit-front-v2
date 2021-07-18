<template>
  <div class="exercise">
    <div class="exercise__header">
      <div class="exercise__header__title-and-actions">
        <h3>{{ exercise.title }}</h3>
        <button @click="editExercise(exercise)">
          <font-awesome-icon :icon="faEdit" />Update
        </button>
        <button @click="deleteExerciseHandle(exercise)">
          <font-awesome-icon :icon="faTrash" />Delete
        </button>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useExercise from "@/composables/useExercise";

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props, ctx) {
    const { deleteExercise } = useExercise();

    const languageNames = computed(() => {
      return props.exercise.cases.map((curCase) => {
        return curCase.language.languageName;
      });
    });

    const mapLanguageName = new Map([
      ["C11", "c"],
      ["JAVA8", "java"],
    ]);
    const languageTitle = (languageName: string) => {
      return mapLanguageName.get(languageName);
    };

    const editExercise = (exercise: DtoExercise) => {
      // TODO update exercise redirect to page exercise
      console.log(`update ${exercise.id}`);
    };

    const deleteExerciseHandle = async (exercise: DtoExercise) => {
      try {
        // TODO delete exercise open modal
        await deleteExercise(exercise.id);
      } catch (err) {
        console.error(err);
      }
    };

    return {
      languageNames,
      languageTitle,
      faEdit,
      faTrash,
      editExercise,
      deleteExerciseHandle,
    };
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
    &__title-and-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        margin-left: 0.75em;
        padding: 0.5em;
        :first-child {
          margin: 0 0.5em;
        }
        background: inherit;
        border: none;
        cursor: pointer;
        color: #556;
        border-radius: 10%;
      }
      button:hover {
        background: #eeeeee;
        color: black;
      }
    }
  }
  &__body {
    margin-bottom: 1em;
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
        margin: 0.5em;
      }
    }
  }
}
</style>