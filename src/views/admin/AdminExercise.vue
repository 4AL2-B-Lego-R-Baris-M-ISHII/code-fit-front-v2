<template>
  <div class="admin-exercise">
    <div class="admin-exercise__exercise-info-and-case-selector">
      <div class="exercise-info">
        <ExerciseInfo
          :exercise="currentExercise"
          @exercise-edited="updateExercise"
        />
      </div>
      <div class="exercise-case-selector-and-status">
        <ExerciseCaseSelector
          :exercise="currentExercise"
          :selectedExerciseCase="currentExerciseCase"
          @exerciseCaseCreated="addExerciseCase"
          @selectedExerciseCaseUpdated="updateSelectedExerciseCase"
          @exerciseCaseDeleted="removeExerciseCaseOfExercise"
        />
        <ExerciseCaseStatus :selectedExerciseCase="currentExerciseCase" />
      </div>
      <hr />
      <div class="save-exercise-case">
        <h3>Verify and save exercise case</h3>
        <button class="verify-btn" @click="verifyExerciseCase">Verify</button>
      </div>
    </div>
    <div class="admin-exercise__solution-start-content">
      <div class="solution">
        <h3>Solution</h3>
        <CodeEditor
          :defaultContent="solution"
          :language="currentLanguage"
          :id="'solution-editor'"
          @contentChange="updateSolution"
        />
      </div>
      <div class="start-content">
        <h3>Start content</h3>
        <CodeEditor
          :defaultContent="startContent"
          :language="currentLanguage"
          :id="'start-content-editor'"
          @contentChange="updateStartContent"
        />
      </div>
    </div>
    <div class="admin-exercise__list-code-result-and_exercise_test">
      <ListCodeResult
        class="list-admin-code-result"
        :listCodeResult="listCodeResult"
        :messageWhenNoCodeResult="'Not output, click on \'Verify\' to get output of exercise case'"
      />
      <ListAdminExerciseTest
        class="list-admin-exercise-test"
        :selectedExerciseCase="currentExerciseCase"
        @emptyTestCreationRequest="createEmptyExerciseTest"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router";

import useExercise from "@/composables/useExercise";
import useExerciseCase from "@/composables/useExerciseCase";
import useErrorModal from "@/composables/useErrorModal";
import useLoading from "@/composables/useLoading";

import ExerciseInfo from "@/components/exercise/ExerciseInfo.vue";
import ExerciseCaseSelector from "@/components/exercise/ExerciseCaseSelector.vue";
import ExerciseCaseStatus from "@/components/exercise/ExerciseCaseStatus.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
import ListCodeResult from "@/components/exercise/list-code-result/ListCodeResult.vue";
import ListAdminExerciseTest from "@/components/exercise/list-exercise-test/ListAdminExerciseTest.vue";

import DtoExerciseCase from "@/types/exercise-case/dto-exercise-case";
import DtoExerciseTest from "@/types/exercise-test/dto-exercise-test";
import CodeResult from "@/types/code/code-result";

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
  },
  components: {
    ExerciseInfo,
    ExerciseCaseSelector,
    ExerciseCaseStatus,
    CodeEditor,
    ListCodeResult,
    ListAdminExerciseTest,
  },
  setup(props) {
    const { getOneExercise, currentExercise } = useExercise();
    const {
      currentExerciseCase,
      getOneExerciseCase,
      updateAndVerifyExerciseCase,
    } = useExerciseCase();
    const { showErrorModal, messageError } = useErrorModal();
    const { isLoading } = useLoading();
    const currentLanguage = ref("");
    const startContent = ref("");
    const solution = ref("");
    const listCodeResult = ref<CodeResult[]>([]);

    onMounted(async () => {
      try {
        isLoading.value = true;
        await findExercise();
        currentExerciseCase.value = currentExercise.value.cases[0];
        currentLanguage.value = currentExerciseCase.value.language.languageName;
        startContent.value = currentExerciseCase.value.startContent;
        solution.value = currentExerciseCase.value.solution;
      } catch (err: any | Response) {
        if (err.status !== undefined && err.status === 404) {
          router.push("/404");
        } else {
          if (typeof err === "string") {
            if (err.startsWith("[404]")) {
              router.push("/404");
              return;
            }
            messageError.value = err;
          } else {
            const errorResponse = err as Response;
            messageError.value = await errorResponse.text();
          }

          showErrorModal.value = true;
        }
      } finally {
        isLoading.value = false;
      }
    });

    // Exercise
    const findExercise = async () => {
      await getOneExercise(parseInt(props.exerciseId));
    };
    const updateExercise = (title: string, description: string) => {
      if (currentExercise.value === undefined) {
        return;
      }

      currentExercise.value.title = title;
      currentExercise.value.description = description;
    };

    // Exercise case
    const addExerciseCase = async (exerciseCaseId: number) => {
      try {
        const foundExerciseCase = await getOneExerciseCase(exerciseCaseId);
        currentExercise.value.cases.push(foundExerciseCase);
        currentExerciseCase.value = foundExerciseCase;
        startContent.value = foundExerciseCase.startContent;
        solution.value = foundExerciseCase.solution;
        isLoading.value = false;
      } catch (err) {
        console.error(err);
      }
    };
    const updateSelectedExerciseCase = (exerciseCase: DtoExerciseCase) => {
      currentExerciseCase.value = exerciseCase;
      startContent.value = exerciseCase.startContent;
      solution.value = exerciseCase.solution;
      listCodeResult.value = [];
    };
    const removeExerciseCaseOfExercise = (exerciseCaseId: number) => {
      const cases = currentExercise.value.cases.filter((curCase) => {
        return curCase.id !== exerciseCaseId;
      });
      currentExercise.value.cases = cases;
      currentExerciseCase.value = cases[0];
      isLoading.value = false;
    };
    const updateSolution = (newSolution: string) => {
      currentExerciseCase.value.solution = newSolution;
    };
    const updateStartContent = (newStartContent: string) => {
      currentExerciseCase.value.startContent = newStartContent;
    };

    // Exercise test
    const createEmptyExerciseTest = () => {
      const currentLenght = currentExerciseCase.value.tests.length;
      const newTest = {} as DtoExerciseTest;
      newTest.content =
        currentExerciseCase.value.tests[currentLenght - 1].content;
      newTest.position = currentLenght + 1;
      currentExerciseCase.value.tests.push(newTest);
    };

    const verifyExerciseCase = async () => {
      try {
        isLoading.value = true;
        const result = await updateAndVerifyExerciseCase(
          currentExerciseCase.value
        );
        listCodeResult.value = result.codeResultList;
        currentExerciseCase.value.isValid = result.isExerciseCaseValid;
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      currentExercise,
      updateExercise,
      currentExerciseCase,
      startContent,
      currentLanguage,
      findExercise,
      addExerciseCase,
      updateSelectedExerciseCase,
      removeExerciseCaseOfExercise,
      updateSolution,
      updateStartContent,
      createEmptyExerciseTest,
      solution,
      verifyExerciseCase,
      listCodeResult,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-exercise {
  h3 {
    margin: 0;
    margin-bottom: 0.5em;
  }
  &__exercise-info-and-case-selector {
    display: flex;

    .exercise-info {
      width: 45%;
    }

    .exercise-case-selector-and-status {
      padding: 1em;
      .exercise-case-status {
        margin-top: 1em;
        margin-left: 1em;
      }
    }
    hr {
      border-color: #fff;
      margin: 1em 0;
    }
  }

  .save-exercise-case {
    padding: 1em;
    .save-btn {
      margin-left: 0.75em;
      padding: 0.5em 1em;
      background: #42b88311;
      border: none;
      cursor: pointer;
      color: #556;
      border-radius: 10%;
    }
    .save-btn:hover {
      background: #42b8833a;
      color: black;
    }
    .verify-btn {
      margin-left: 0.75em;
      padding: 0.5em 1em;
      background: #42b88311;
      border: none;
      cursor: pointer;
      color: #556;
      border-radius: 10%;
    }
    .verify-btn:hover {
      background: #0184ff1c;
      color: black;
    }
  }
  &__solution-start-content {
    display: flex;
    justify-content: space-between;
    .solution,
    .start-content {
      width: 50%;
      margin: 0 1em;
    }
  }

  &__list-code-result-and_exercise_test {
    display: flex;
    justify-content: space-between;
    .list-admin-code-result,
    .list-admin-exercise-test {
      width: 50%;
      margin: 1em 1em;
    }
  }
}
</style>