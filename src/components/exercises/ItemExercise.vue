<template>
  <div class="exercise">
    <div class="exercise__header">
      <div class="exercise__header__title-and-actions">
        <h3>{{ exercise.title }}</h3>
        <button @click="editExercise(exercise)">
          <font-awesome-icon :icon="faEdit" />Update
        </button>
        <button @click="confirmDeleteExercise()">
          <font-awesome-icon :icon="faTrash" />Delete
        </button>
      </div>
      <div class="creator">
        Creator : <strong>{{ exercise.user.username }}</strong>
      </div>
    </div>
    <div class="exercise__body">
      <div class="description">{{ exercise.description }}</div>
      <div class="languages">
        <span v-for="exerciseCase in exercise.cases" :key="exerciseCase.id">
          <div v-if="exerciseCase.isValid">
            <img
              v-if="exerciseCase.language.languageName === 'C11'"
              src="@/assets/img/languages/valid-c.svg"
              title="Valid C exercise case"
            />
            <img
              v-else-if="exerciseCase.language.languageName === 'JAVA8'"
              src="@/assets/img/languages/valid-java.svg"
              title="Valid Java exercise case"
            />
            <span v-else>{{ exerciseCase.language.languageName }}</span>
          </div>

          <div v-else>
            <img
              v-if="exerciseCase.language.languageName === 'C11'"
              src="@/assets/img/languages/invalid-c.svg"
              title="Invalid C exercise case"
            />
            <img
              v-else-if="exerciseCase.language.languageName === 'JAVA8'"
              src="@/assets/img/languages/invalid-java.svg"
              title="Invalid Java exercise case"
            />
            <span v-else>{{ exerciseCase.language.languageName }}</span>
          </div>
        </span>
      </div>
    </div>
  </div>

  <ConfirmationModal
    :title="`Delete exercise '${exercise.title}'`"
    :showConfirmationModal="showModal"
    @closed="closeModal"
    @confirm="deleteExerciseHandle(exercise)"
  />
</template>
<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import { computed, defineComponent, PropType, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useExercise from "@/composables/useExercise";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue";
import router from "@/router";

export default defineComponent({
  components: {
    FontAwesomeIcon,
    ConfirmationModal,
  },
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props) {
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
      router.push({
        name: "AdminExercise",
        params: { exerciseId: exercise.id },
      });
    };

    const showModal = ref(false);
    const confirmDeleteExercise = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };

    const deleteExerciseHandle = async (exercise: DtoExercise) => {
      try {
        await deleteExercise(exercise.id);
        showModal.value = false;
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
      confirmDeleteExercise,
      showModal,
      closeModal,
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
      display: flex;
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