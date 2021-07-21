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
import DtoLanguage from "@/types/language/dto-language";

import CreateExerciseCaseModal from "@/components/modal/exercise/CreateExerciseCaseModal.vue";
import useExerciseCase from "@/composables/useExerciseCase";

export default defineComponent({
  components: {
    FontAwesomeIcon,
    CreateExerciseCaseModal,
  },
  props: {
    exercise: {
      type: Object as PropType<DtoExercise>,
    },
    selectedExerciseCase: {
      type: Object as PropType<DtoExerciseCase>,
    },
  },
  emits: ["exerciseCaseCreated", "selectedExerciseCaseUpdated"],
  setup(props, ctx) {
    const { getAllLanguages } = useLanguage();
    const allLanguages = ref<DtoLanguage[]>([]);
    const showCreateExerciseCaseModal = ref(false);
    const selectedLanguage = ref<string>();

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

    const toggleCreateExerciseCaseModal = () => {
      showCreateExerciseCaseModal.value = !showCreateExerciseCaseModal.value;
    };

    const closeModalAndEmitUpdateExercise = (newExerciseCaseId: number) => {
      showCreateExerciseCaseModal.value = false;
      ctx.emit("exerciseCaseCreated", newExerciseCaseId);
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