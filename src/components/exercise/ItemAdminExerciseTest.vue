<template>
  <div class="item-admin-exercise-test">
    <div>test {{ id }}</div>
    <CodeEditor
      :defaultContent="testContent"
      :language="languageStr"
      :id="'test' + id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watch } from "vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import DtoExerciseTest from "@/types/exercise-test/dto-exercise-test";
import DtoLanguage from "@/types/language/dto-language";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: Number,
    },
    exerciseTest: {
      required: true,
      type: Object as PropType<DtoExerciseTest>,
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
    onMounted(() => {
      if (props.exerciseTest) {
        testContent.value = props.exerciseTest.content;
      }
      if (props.language) {
        languageStr.value = props.language.languageName;
      }
    });
    watch(props, () => {
      if (props.exerciseTest) {
        testContent.value = props.exerciseTest.content;
      }
      if (props.language) {
        languageStr.value = props.language.languageName;
      }
    });
    return { testContent, languageStr };
  },
});
</script>

<style lang="scss" scoped>
.item-admin-exercise-test {
  margin-bottom: 1em;
}
</style>