<template>
  <div class="user-exercise container">
    <UserExerciseInfo
      :title="currentExercise.title"
      :description="currentExercise.description"
      :isResolved="isResolved"
    />
    <hr />
    <div class="user-code-editor">
      <CodeEditor
        :defaultContent="defaultCodeContent"
        :id="'userCodeEditor'"
        @contentChange="updateCodeContent"
      />
      <div class="user-code-editor__submit-btn" @click="verifyCodeExercise">
        <button>Submit</button>
      </div>
      <ListCodeResult
        :listCodeResult="listCodeResult"
        :messageWhenNoCodeResult="'Not output, click on \'Submit\' to get output of exercise'"
      />
    </div>
    <SuccessExerciseModal :showModal="showSuccessModal" @closed="closedModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router";

import UserExerciseInfo from "@/components/exercise/user-exercise/UserExerciseInfo.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import ListCodeResult from "@/components/exercise/list-code-result/ListCodeResult.vue";
import SuccessExerciseModal from "@/components/modal/user-exercise/SuccessExerciseModal.vue";

import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import useExercise from "@/composables/useExercise";
import useExerciseCase from "@/composables/useExerciseCase";
import useErrorModal from "@/composables/useErrorModal";
import useLoading from "@/composables/useLoading";
import useCode from "@/composables/useCode";
import CodeResult from "@/types/code/code-result";

export default defineComponent({
  components: {
    UserExerciseInfo,
    CodeEditor,
    ListCodeResult,
    SuccessExerciseModal,
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
    const { currentExerciseCase, getOneExerciseCase } = useExerciseCase();
    const { openErrorModal, openErrorModalWithTitle } = useErrorModal();
    const { isLoading } = useLoading();
    const { saveCodeAndCompile } = useCode();

    const defaultCodeContent = ref("");
    const codeContent = ref("");

    const listCodeResult = ref<CodeResult[]>([]);
    const isResolved = ref(false);
    const showSuccessModal = ref(false);

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
        const foundExerciseCase = await getOneExerciseCase(
          exerciseCaseId,
          true
        );
        if (foundExerciseCase === undefined) {
          router.push("/404");
          return;
        }
        currentExerciseCase.value = foundExerciseCase;

        defaultCodeContent.value =
          getDefaultCodeContentDependToFoundExerciseCase(foundExerciseCase);

        isResolved.value = foundExerciseCase.codes?.[0].isResolved ?? false;

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

    function getDefaultCodeContentDependToFoundExerciseCase(
      foundExerciseCase: DtoExerciseCase
    ): string {
      const foundExerciseCaseCodeContent = foundExerciseCase.codes?.[0].content;
      return foundExerciseCaseCodeContent !== undefined
        ? foundExerciseCaseCodeContent
        : foundExerciseCase.startContent;
    }

    const updateCodeContent = (newCodeContent: string) => {
      codeContent.value = newCodeContent;
    };

    const verifyCodeExercise = async () => {
      try {
        isLoading.value = true;
        const result = await saveCodeAndCompile(
          codeContent.value,
          currentExerciseCase.value.id
        );
        const currentCodeIsResolved = result?.isResolved ?? false;
        isResolved.value = currentCodeIsResolved;
        listCodeResult.value = result?.listCodeResult ?? [];
        if (currentCodeIsResolved) {
          showSuccessModal.value = true;
        }
      } catch (err) {
        openErrorModal(`Cause : ${err}`);
      } finally {
        isLoading.value = false;
      }
    };

    const closedModal = () => {
      showSuccessModal.value = false;
    };
    return {
      currentExercise,
      currentExerciseCase,
      defaultCodeContent,
      updateCodeContent,
      verifyCodeExercise,
      listCodeResult,
      isResolved,
      showSuccessModal,
      closedModal,
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