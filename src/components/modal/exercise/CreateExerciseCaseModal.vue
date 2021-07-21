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
            @click="createExerciseCase"
          >
            Create Exercise Case
          </button>
        </div>
        <div>Select language</div>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoLanguage from "@/types/language/dto-language";
import { computed, defineComponent, PropType, ref } from "vue";
import Modal from "@/components/modal/Modal.vue";

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
  emits: ["closed"],
  setup(props) {
    const selectedLanguage = ref<string>();
    const isSubmit = ref(false);

    const availableLanguages = computed(() => {
      const usedLanguagesIds = props.exercise.cases.map(
        (curCase) => curCase.language.id
      );
      console.log(props.languages);
      return props.languages.filter(
        (language) => !usedLanguagesIds.includes(language.id)
      );
    });

    const createExerciseCase = () => {
      const foundLanguage = props.languages.find(
        (language) => language.languageName === selectedLanguage.value
      );
      console.log(foundLanguage);
    };
    return { availableLanguages, selectedLanguage, createExerciseCase };
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