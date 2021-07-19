<template>
  <section class="exercise-info">
    <div class="exercise-info__group">
      <h2>Exercise info</h2>
      <button @click="editExercise(exercise)">
        <font-awesome-icon :icon="faEdit" />Change Info
      </button>
    </div>

    <div class="exercise-info__group">
      <div>Title :</div>
      <div>{{ exercise.title }}</div>
    </div>
    <div class="exercise-info__group">
      <div>Description:</div>
      <div>{{ exercise.description }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DtoExercise from "@/types/exercise/dto-exercise";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup() {
    const editExercise = () => {
      console.log("editExercise");
    };
    return { editExercise, faEdit };
  },
});
</script>

<style lang="scss" scoped>
.exercise-info {
  margin: 0.5em 0;
  padding: 1em;
  border: solid;

  h2 {
    margin: 0 0.5em;
    margin-bottom: 0.5em;
  }

  &__group {
    display: flex;
    div {
      margin: 0.25em 0.5em;
    }
  }
  button {
    margin-left: 0.75em;
    padding: 0.5em;
    :first-child {
      margin: 0 0.5em;
    }
    background: inherit;
    border: none;
    cursor: pointer;
    color: #556;
    border-radius: 10%;
  }
  button:hover {
    background: #eeeeee;
    color: black;
  }
}
</style>