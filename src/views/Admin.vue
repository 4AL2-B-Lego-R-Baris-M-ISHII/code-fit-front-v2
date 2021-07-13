<template>
  <div>
    <h1>Exercises</h1>
    <ListExercise :exercises="exercises" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useExercise from "@/composables/useExercise";
import useLoading from "@/composables/useLoading";

import ListExercise from "@/components/exercise/ListExercise.vue";

export default defineComponent({
  components: { ListExercise },
  setup() {
    const { exercises, getAllExercises } = useExercise();
    const { isLoading } = useLoading();
    onMounted(async () => {
      isLoading.value = true;
      await getAllExercises();
      isLoading.value = false;
    });

    return { exercises };
  },
});
</script>
