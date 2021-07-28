<template>
  <div class="container">
    <div class="exercise-title">
      <h1>Your exercises</h1>
      <div class="exercise-title__create-btn">
        <router-link :to="{ name: 'CreateExercise' }"
          ><font-awesome-icon
            :icon="faPlusSquare"
            size="lg"
          />Create</router-link
        >
      </div>
    </div>

    <ListExercise :exercises="exercises" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import useExercise from "@/composables/useExercise";
import useLoading from "@/composables/useLoading";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ListExercise from "@/components/exercises/ListExercise.vue";

export default defineComponent({
  name: "Admin",
  components: { ListExercise, FontAwesomeIcon },
  setup() {
    const { exercises, getAllCreatorExercises } = useExercise();
    const { isLoading } = useLoading();
    onMounted(async () => {
      isLoading.value = true;
      try {
        await getAllCreatorExercises();
      } finally {
        isLoading.value = false;
      }
    });

    onUnmounted(() => {
      exercises.value = [];
    });

    return { exercises, faPlusSquare };
  },
});
</script>

<style lang="scss" scoped>
.exercise-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    font-size: 1em;
    background: #42b88311;
    border: none;
    border-radius: 10%;
    color: #35495e;
    text-decoration: none;
    :first-child {
      margin-right: 0.5em;
    }
  }
  a:hover {
    color: black;
    background: #42b88344;
  }
}
</style>