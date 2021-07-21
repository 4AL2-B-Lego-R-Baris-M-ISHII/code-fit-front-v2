<template>
  <div>
    <ExerciseInfo :exercise="exercise" @exercise-edited="updateExercise" />
    <ExerciseCaseSelector :exercise="exercise" />
  </div>
</template>

<script lang="ts">
import useExercise from "@/composables/useExercise";
import useExerciseCase from "@/composables/useExerciseCase";
import { defineComponent, onMounted, ref } from "vue";
import ExerciseInfo from "@/components/exercise/ExerciseInfo.vue";
import ExerciseCaseSelector from "@/components/exercise/ExerciseCaseSelector.vue";
import router from "@/router";
import useErrorModal from "@/composables/useErrorModal";

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
    // CodeEditor,
  },
  setup(props) {
    const { getOneExercise, currentExercise } = useExercise();
    const { currentExerciseCase } = useExerciseCase();
    const { showErrorModal, messageError } = useErrorModal();
    const content = ref("default!!!!");

    onMounted(async () => {
      try {
        await getOneExercise(parseInt(props.exerciseId));
        if (currentExercise.value === undefined)
          throw "Current exercise is undefined";
        currentExerciseCase.value = currentExercise.value.cases[0];
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
      }
    });

    const updateExercise = (title: string, description: string) => {
      if (currentExercise.value === undefined) {
        console.warn("current exercise undefined");
        return;
      }

      currentExercise.value.title = title;
      currentExercise.value.description = description;
    };

    // const languageNames = computed(() => {
    //   if (currentExercise.value.cases === undefined) return [];
    //   return currentExercise.value.cases.map((curCase) => {
    //     return curCase.language.languageName;
    //   });
    // });

    // const mapLanguageName = new Map([
    //   ["C11", "c"],
    //   ["JAVA8", "java"],
    // ]);
    // const languageTitle = (languageName: string) => {
    //   return mapLanguageName.get(languageName);
    // };
    return {
      exercise: currentExercise,
      updateExercise,
      content,
      // languageNames,
      // languageTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
}
.languages {
  margin-left: 1em;
  span {
    margin-right: 0.5em;
  }
  img {
    height: 3em;
    margin: 0.5em;
  }
}
</style>