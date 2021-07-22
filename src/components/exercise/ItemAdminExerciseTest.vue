<template>
  <div class="item-admin-exercise-test">
    <div>test {{ id }}</div>
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

export default defineComponent({
  props: {
    id: {
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
    return { testContent, languageStr, updateTestContent };
  },
});
</script>

<style lang="scss" scoped>
.item-admin-exercise-test {
  margin-bottom: 1em;
}
</style>