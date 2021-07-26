<template>
  <teleport to="#modals" v-if="showModal">
    <Modal @closed="$emit('closed')">
      <div class="title">
        <h3>Select language of exercise</h3>
      </div>

      <template v-slot:links>
        <div class="links">
          <div class="select-language">
            <select v-model="selectedLanguage">
              <option v-for="exerciseCase in exerciseCases" :key="exerciseCase">
                {{ exerciseCase.language.languageName }}
              </option>
            </select>
          </div>
          <div class="buttons-section">
            <button class="buttons-section__select-btn">Select</button>
            <button
              class="buttons-section__cancel-btn"
              @click="$emit('closed')"
            >
              Cancel
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import Modal from "@/components/modal/Modal.vue";
import DtoExercise from "@/types/exercise/dto-exercise";
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["closed"],
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props) {
    const selectedLanguage = ref<string>("");
    const exerciseCases = ref<DtoExerciseCase[]>([]);
    watch(props, () => {
      exerciseCases.value = props.exercise.cases;
      selectedLanguage.value = exerciseCases.value[0].language.languageName;
    });
    return { selectedLanguage, exerciseCases };
  },
});
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select-language {
    :first-child {
      padding: 0.25em;
    }
  }
  button {
    min-width: 80px;
  }
  .buttons-section {
    display: flex;
    &__select-btn {
      cursor: pointer;
      margin-left: 1em;
      padding: 0.75em;
      background: #42b88311;
      border: none;
      border-radius: 10%;
      color: #35495e;
      text-decoration: none;
    }
    &__select-btn:hover {
      color: black;
      background: #42b88344;
    }
    &__cancel-btn {
      padding: 0.5em 1em;
      border: none;
      cursor: pointer;
      cursor: pointer;
      margin-left: 1em;
      padding: 0.75em;
      background: #35495e11;
      border-color: #999;
      border-radius: 10%;
      width: 6em;
      color: #35495e;
      text-decoration: none;
    }
    &__cancel-btn:hover {
      color: black;
      background: #ca444446;
      font-weight: bold;
    }
  }
}
</style>