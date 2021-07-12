<template>
  <div>
    <h1>Exercises</h1>

    <div>
      <hr />
      <div v-for="exercise in exercises" :key="exercise.id">
        <h3>{{ exercise.title }}</h3>
        <p>{{ exercise.description }}</p>
        <p>
          creator : <strong>{{ exercise.user.username }}</strong>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useExercise from "@/composables/useExercise";
import useLoading from "@/composables/useLoading";

export default defineComponent({
  setup() {
    const { exercises, getAllExercises } = useExercise();
    const { isLoading } = useLoading();
    onMounted(async () => {
      isLoading.value = true;
      await getAllExercises();
      console.log(exercises.value);
      isLoading.value = false;
    });

    return { exercises };
  },
});
</script>

<style lang="scss" scoped>
</style>