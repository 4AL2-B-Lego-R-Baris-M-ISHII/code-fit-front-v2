<template>
  <div>
    <div class="exercise-title">
      <h1>Exercises</h1>
      <div class="exercise-title__create-btn">
        <button @click="createExercise()">
          <font-awesome-icon :icon="faPlusSquare" size="lg" />Create
        </button>
      </div>
    </div>

    <ListExercise :exercises="exercises" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useExercise from "@/composables/useExercise";
import useLoading from "@/composables/useLoading";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ListExercise from "@/components/exercise/ListExercise.vue";

export default defineComponent({
  components: { ListExercise, FontAwesomeIcon },
  setup() {
    const { exercises, getAllExercises } = useExercise();
    const { isLoading } = useLoading();
    onMounted(async () => {
      isLoading.value = true;
      await getAllExercises();
      isLoading.value = false;
    });

    const createExercise = () => {
      console.log("create exercise");
    };

    return { exercises, faPlusSquare, createExercise };
  },
});
</script>

<style lang="scss" scoped>
.exercise-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    font-size: 1em;
    background: #42b88311;
    border: none;
    border-radius: 10%;
    color: #35495e;
    :first-child {
      margin-right: 0.5em;
    }
  }
  button:hover {
    color: black;
    background: #42b88344;
  }
}
</style>