<template>
  <div class="user-exercise container">
    <UserExerciseInfo
      :title="currentExercise.title"
      :description="currentExercise.description"
    />
    <hr />
    <div class="user-code-editor">
      <CodeEditor
        :defaultContent="defaultCodeContent"
        :id="'userCodeEditor'"
        @contentChange="updateCodeContent"
      />
      <div class="user-code-editor__submit-btn"><button>Submit</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router";

import UserExerciseInfo from "@/components/exercise/user-exercise/UserExerciseInfo.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";

import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import useExercise from "@/composables/useExercise";
import useExerciseCase from "@/composables/useExerciseCase";
import useErrorModal from "@/composables/useErrorModal";
import useLoading from "@/composables/useLoading";

export default defineComponent({
  components: {
    UserExerciseInfo,
    CodeEditor,
  },
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
    exerciseCaseId: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { getOneExercise, currentExercise } = useExercise();
    const { currentExerciseCase } = useExerciseCase();
    const { openErrorModal, openErrorModalWithTitle } = useErrorModal();
    const { isLoading } = useLoading();
    const defaultCodeContent = ref("");
    const codeContent = ref("");

    onMounted(async () => {
      const exerciseId = parseInt(props.exerciseId);
      const exerciseCaseId = parseInt(props.exerciseCaseId);
      if (isNaN(exerciseId) || isNaN(exerciseCaseId)) {
        openErrorModalWithTitle(
          "Problem",
          "Problem with properties of exercise id or exercise case id, they have to be numbers."
        );
        return;
      }
      await searchExerciseAndCase(exerciseId, exerciseCaseId);
    });

    async function searchExerciseAndCase(
      exerciseId: number,
      exerciseCaseId: number
    ) {
      try {
        isLoading.value = true;
        await getOneExercise(exerciseId);
        const foundExerciseCase = currentExercise.value.cases.find(
          (curCase: DtoExerciseCase) => curCase.id === exerciseCaseId
        );
        if (foundExerciseCase === undefined) {
          router.push("/404");
          return;
        }
        currentExerciseCase.value = foundExerciseCase;
        defaultCodeContent.value = foundExerciseCase.startContent;
        isLoading.value = false;
      } catch (err) {
        if (typeof err === "string") {
          if (err.startsWith("[404]")) {
            router.push("/404");
            return;
          }
        }
        const response = err as Response;
        openErrorModal(await response.text());
      }
    }

    const updateCodeContent = (newCodeContent: string) => {
      codeContent.value = newCodeContent;
    };

    return {
      currentExercise,
      currentExerciseCase,
      defaultCodeContent,
      updateCodeContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-code-editor {
  margin: 1em 0;
  &__submit-btn {
    margin-top: 1em;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 0.75em;
      padding: 1em;
      :first-child {
        margin: 0 0.5em;
      }
      background: inherit;
      border: none;
      cursor: pointer;
      color: #556;
      background: #eeeeee;
      border-radius: 10%;
    }
    button:hover {
      background: #dddddd;
      color: black;
    }
  }
}
</style>