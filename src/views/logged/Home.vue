<template>
  <div class="home container">
    <h1>List exercises</h1>
  </div>
</template>

<script lang="ts">
import useExercise from "@/composables/useExercise";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const { getAllExercisesWithLoggedUserCode, exercises } = useExercise();

    onMounted(async () => {
      await getAllExercisesWithLoggedUserCode();
      console.log(exercises.value);
    });
    return { exercises };
  },
});
</script>
