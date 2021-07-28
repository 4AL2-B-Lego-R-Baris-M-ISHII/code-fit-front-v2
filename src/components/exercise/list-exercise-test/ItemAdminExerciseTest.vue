<template>
  <div class="item-admin-exercise-test">
    <div class="item-admin-exercise-test__top">
      <div>test {{ id }}</div>
      <button
        v-if="testsLenght > 1"
        class="item-admin-exercise-test__top__delete-btn"
        @click="deleteTest"
        title="Delete exercise test"
      >
        <font-awesome-icon :icon="faTrash" size="lg" />
      </button>
    </div>
    <CodeEditor
      :defaultContent="testContent"
      :language="languageStr"
      :id="'test' + id"
      @contentChange="updateTestContent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watch } from "vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import DtoLanguage from "@/types/language/dto-language";
import useExerciseCase from "@/composables/useExerciseCase";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: Number,
    },
    testsLenght: {
      required: true,
      type: Number,
    },
    index: {
      required: true,
      type: Number,
    },
    language: {
      required: true,
      type: Object as PropType<DtoLanguage>,
    },
  },
  components: {
    CodeEditor,
    FontAwesomeIcon,
  },
  setup(props) {
    const testContent = ref("");
    const languageStr = ref("");
    const { currentExerciseCase } = useExerciseCase();
    onMounted(() => {
      if (currentExerciseCase.value.tests !== undefined) {
        testContent.value =
          currentExerciseCase.value.tests[props.index].content;
        languageStr.value = currentExerciseCase.value.language.languageName;
      }
    });
    watch(props, () => {
      if (currentExerciseCase.value.tests !== undefined) {
        testContent.value =
          currentExerciseCase.value.tests[props.index].content;
        languageStr.value = currentExerciseCase.value.language.languageName;
      }
    });

    const updateTestContent = (newContent: string) => {
      if (currentExerciseCase.value.tests !== undefined) {
        currentExerciseCase.value.tests[props.index].content = newContent;
      }
    };

    const deleteTest = () => {
      const concernedTest = currentExerciseCase.value.tests[props.index];

      currentExerciseCase.value.tests = currentExerciseCase.value.tests.filter(
        (test) => test.position !== concernedTest.position
      );
      currentExerciseCase.value.tests
        .sort((test1, test2) => test1.position - test2.position)
        .forEach((test, index) => {
          return (test.position = index + 1);
        });
    };
    return { faTrash, testContent, languageStr, updateTestContent, deleteTest };
  },
});
</script>

<style lang="scss" scoped>
.item-admin-exercise-test {
  margin-bottom: 1em;

  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
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
}
</style>