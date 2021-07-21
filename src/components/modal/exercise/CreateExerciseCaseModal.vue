<template>
  <teleport to="#modals" v-if="showModal">
    <Modal @closed="$emit('closed')">
      <div class="create-exercise-case-modal">
        <h2>Select language of new exercise case</h2>
        <div class="create-exercise-case-modal__languages">
          <select v-model="selectedLanguage">
            <option v-for="language in availableLanguages" :key="language.id">
              {{ language.languageName }}
            </option>
          </select>
          <button
            class="create-exercise-case-modal__create-btn"
            @click="handleSubmit"
          >
            Create Exercise Case
          </button>
        </div>
        <div v-if="isSubmit && isError" class="error-message">
          Language has to be selected
        </div>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoLanguage from "@/types/language/dto-language";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import Modal from "@/components/modal/Modal.vue";
import useExerciseCase from "@/composables/useExerciseCase";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
    exercise: {
      type: Object as PropType<DtoExercise>,
      required: true,
    },
    languages: {
      type: Array as PropType<DtoLanguage[]>,
      required: true,
    },
  },
  emits: ["closed", "created"],
  setup(props, ctx) {
    const selectedLanguage = ref<string>();
    const isSubmit = ref(false);
    const isError = ref(false);
    const { createExerciseCase } = useExerciseCase();

    const availableLanguages = computed(() => {
      return getUnusedLanguages();
    });

    function getUnusedLanguages() {
      if (props.exercise.cases === undefined) return [];
      const usedLanguagesIds = props.exercise.cases.map(
        (curCase) => curCase.language.id
      );
      return props.languages.filter(
        (language) => !usedLanguagesIds.includes(language.id)
      );
    }

    const handleSubmit = async () => {
      isSubmit.value = true;
      const foundLanguage = props.languages.find(
        (language) => language.languageName === selectedLanguage.value
      );
      if (foundLanguage === undefined) {
        isError.value = true;
        return;
      }
      try {
        const newExerciseCaseId = await createExerciseCase(
          props.exercise.id,
          foundLanguage.id
        );
        ctx.emit("created", newExerciseCaseId);
      } catch (err) {
        console.error(err);
      }
    };

    watch(props, () => {
      const unusedLanguages = getUnusedLanguages();
      if (unusedLanguages.length === 0) return;
      selectedLanguage.value = unusedLanguages[0].languageName;
    });

    watch(selectedLanguage, () => {
      isError.value = selectedLanguage.value === undefined;
    });
    return {
      availableLanguages,
      selectedLanguage,
      handleSubmit,
      isSubmit,
      isError,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-exercise-case-modal {
  &__languages {
    margin-bottom: 1em;
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
}
</style>