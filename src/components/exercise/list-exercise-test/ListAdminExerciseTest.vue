<template>
  <div class="list-admin-exercise-test">
    <div class="list-admin-exercise-test__top">
      <h3>Tests of exercise case</h3>
      <button
        class="list-admin-exercise-test__top__create-btn"
        title="Create exercise test"
      >
        <font-awesome-icon
          :icon="faPlusSquare"
          size="lg"
          @click="$emit('emptyTestCreationRequest')"
        />
      </button>
    </div>
    <div class="list-container">
      <div v-for="(test, index) in orderedListTest" :key="index">
        <ItemAdminExerciseTest
          :id="index + 1"
          :index="index"
          :language="currentLanguage"
          :testsLenght="orderedListTest.length"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import DtoExerciseTest from "@/types/exercise-test/dto-exercise-test";
import { computed, defineComponent, PropType, ref, watch } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import ItemAdminExerciseTest from "@/components/exercise/list-exercise-test/ItemAdminExerciseTest.vue";
import DtoLanguage from "@/types/language/dto-language";

export default defineComponent({
  components: {
    ItemAdminExerciseTest,
    FontAwesomeIcon,
  },
  emits: ["emptyTestCreationRequest"],
  props: {
    selectedExerciseCase: {
      type: Object as PropType<DtoExerciseCase>,
    },
  },
  setup(props) {
    const listExerciseTest = ref<DtoExerciseTest[]>([]);
    const currentLanguage = ref<DtoLanguage>();

    const orderedListTest = computed(() => {
      if (listExerciseTest.value.length <= 1) return listExerciseTest.value;
      const result = listExerciseTest.value;
      result.sort((test1, test2) => test1.position - test2.position);
      return result;
    });

    watch(props, () => {
      if (props.selectedExerciseCase) {
        listExerciseTest.value = props.selectedExerciseCase.tests;
        currentLanguage.value = props.selectedExerciseCase.language;
      }
    });

    return {
      faPlusSquare,
      orderedListTest,
      currentLanguage,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-admin-exercise-test {
  margin: 0 1em;

  &__top {
    display: flex;
    align-items: center;

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
  .list-container {
    overflow-y: scroll;
    scroll-behavior: auto;
    height: 400px;
  }
}
</style>