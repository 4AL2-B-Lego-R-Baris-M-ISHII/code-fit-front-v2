<template>
  <div class="exercise-case-selector">
    <div class="exercise-case-selector__title">
      Select exercise case by language
    </div>
    <div>
      <div class="cases-languages">
        <select v-model="selectedLanguage">
          <option v-for="language in languageNames" :key="language">
            {{ language }}
          </option>
        </select>
      </div>
    </div>
    <button
      v-if="showCreateButton"
      class="exercise-case-selector__create-btn"
      title="Create Exercise Case"
      @click="toggleCreateExerciseCaseModal"
    >
      <font-awesome-icon :icon="faPlusSquare" size="lg" />
    </button>
    <button
      v-if="showDeleteButton"
      class="exercise-case-selector__delete-btn"
      title="Delete Current Exercise Case"
      @click="toggleConfirmationModal"
    >
      <font-awesome-icon :icon="faTrash" size="lg" />
    </button>
  </div>
  <CreateExerciseCaseModal
    :showModal="showCreateExerciseCaseModal"
    :exercise="exercise"
    :languages="allLanguages"
    @closed="toggleCreateExerciseCaseModal"
    @created="closeModalAndEmitUpdateExercise"
  />
  <ConfirmationModal
    :title="titleConfirmationModal"
    :showConfirmationModal="showConfirmationModal"
    @closed="toggleConfirmationModal"
    @confirm="deleteCurrentExerciseCase"
  />
</template>

<script lang="ts">
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import DtoExercise from "@/types/exercise/dto-exercise";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import useLanguage from "@/composables/useLanguage";
import useExerciseCase from "@/composables/useExerciseCase";

import DtoLanguage from "@/types/language/dto-language";

import CreateExerciseCaseModal from "@/components/modal/exercise/CreateExerciseCaseModal.vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue";

export default defineComponent({
  components: {
    FontAwesomeIcon,
    CreateExerciseCaseModal,
    ConfirmationModal,
  },
  props: {
    exercise: {
      type: Object as PropType<DtoExercise>,
    },
    selectedExerciseCase: {
      type: Object as PropType<DtoExerciseCase>,
    },
  },
  emits: [
    "exerciseCaseCreated",
    "selectedExerciseCaseUpdated",
    "exerciseCaseDeleted",
  ],
  setup(props, ctx) {
    const { getAllLanguages } = useLanguage();
    const allLanguages = ref<DtoLanguage[]>([]);
    const selectedLanguage = ref<string>();

    const { currentExerciseCase, deleteExerciseCase } = useExerciseCase();
    const showCreateExerciseCaseModal = ref(false);

    const titleConfirmationModal = ref("");
    const showConfirmationModal = ref(false);

    onMounted(async () => {
      try {
        allLanguages.value = await getAllLanguages();
      } catch (err) {
        console.error(err);
      }
    });

    const languageNames = computed(() => {
      if (props.exercise === undefined || props.exercise.cases === undefined)
        return [];
      return props.exercise.cases.map((curCase) => {
        return curCase.language.languageName;
      });
    });
    const showDeleteButton = computed(() => {
      return (
        props.exercise !== undefined &&
        props.exercise.cases !== undefined &&
        props.exercise.cases.length > 1
      );
    });

    const showCreateButton = computed(() => {
      return (
        props.exercise !== undefined &&
        props.exercise.cases !== undefined &&
        props.exercise.cases.length < allLanguages.value.length
      );
    });
    const toggleCreateExerciseCaseModal = () => {
      showCreateExerciseCaseModal.value = !showCreateExerciseCaseModal.value;
    };
    const closeModalAndEmitUpdateExercise = (newExerciseCaseId: number) => {
      showCreateExerciseCaseModal.value = false;
      ctx.emit("exerciseCaseCreated", newExerciseCaseId);
    };

    const toggleConfirmationModal = () => {
      titleConfirmationModal.value = `Delete exercise case with language '${currentExerciseCase.value.language.languageName}'`;
      showConfirmationModal.value = !showConfirmationModal.value;
    };
    const deleteCurrentExerciseCase = async () => {
      try {
        await deleteExerciseCase(currentExerciseCase.value.id);
        showConfirmationModal.value = false;
        ctx.emit("exerciseCaseDeleted", currentExerciseCase.value.id);
      } catch (err) {
        console.error(err);
      }
    };

    watch(props, () => {
      if (props.selectedExerciseCase?.language) {
        selectedLanguage.value =
          props.selectedExerciseCase.language.languageName;
      }
    });

    watch(selectedLanguage, () => {
      if (props.exercise?.cases) {
        const newSelectedExerciseCase = props.exercise.cases.find(
          (curCase) => curCase.language.languageName === selectedLanguage.value
        );
        if (newSelectedExerciseCase) {
          ctx.emit("selectedExerciseCaseUpdated", newSelectedExerciseCase);
        }
      }
    });
    return {
      languageNames,
      faPlusSquare,
      faTrash,
      showDeleteButton,
      toggleCreateExerciseCaseModal,
      allLanguages,
      showCreateExerciseCaseModal,
      closeModalAndEmitUpdateExercise,
      selectedLanguage,
      deleteCurrentExerciseCase,
      showConfirmationModal,
      titleConfirmationModal,
      toggleConfirmationModal,
      showCreateButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.exercise-case-selector {
  display: flex;
  align-items: center;

  &__title {
    margin: 0 1em;
  }
  &__create-btn {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    background: #42b88311;
    border: none;
    border-radius: 10%;
    color: #35495e;
    text-decoration: none;
  }
  &__create-btn:hover {
    color: black;
    background: #42b88344;
  }

  &__delete-btn {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    background: #42b88311;
    border: none;
    border-radius: 10%;
    color: #35495e;
    text-decoration: none;
  }
  &__delete-btn:hover {
    color: black;
    background: #b8424244;
  }
}
</style>