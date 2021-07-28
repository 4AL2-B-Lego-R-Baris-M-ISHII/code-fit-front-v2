<template>
  <div class="home container">
    <h1>Code exercises</h1>
    <ListExercise :exercises="exercises" :isAdminPage="false" />
  </div>
</template>

<script lang="ts">
import useExercise from "@/composables/useExercise";
import { defineComponent, onMounted } from "vue";

import ListExercise from "@/components/exercises/ListExercise.vue";
import useLoading from "@/composables/useLoading";

export default defineComponent({
  name: "Home",
  components: { ListExercise },
  setup() {
    const { getAllExercisesWithLoggedUserCodeAndValidCases, exercises } =
      useExercise();
    const { isLoading } = useLoading();

    onMounted(async () => {
      isLoading.value = true;
      try {
        await getAllExercisesWithLoggedUserCodeAndValidCases();
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    });
    return { exercises };
  },
});
</script>
