<template>
  <div>
    <hr />
    <div v-for="exercise in orderedListExercise" :key="exercise.id">
      <ItemAdminExercise :exercise="exercise" v-if="isAdminPage" />
      <ItemUserExercise :exercise="exercise" v-else />
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import DtoExercise from "@/types/exercise/dto-exercise";
import { computed, defineComponent, PropType } from "vue";
import ItemAdminExercise from "@/components/exercises/ItemAdminExercise.vue";
import ItemUserExercise from "@/components/exercises/ItemUserExercise.vue";

export default defineComponent({
  name: "ListExercise",
  components: {
    ItemAdminExercise,
    ItemUserExercise,
  },
  props: {
    exercises: {
      required: true,
      type: Array as PropType<DtoExercise[]>,
    },
    isAdminPage: {
      default: true,
      type: Boolean,
    },
  },
  setup(props) {
    const orderedListExercise = computed(() => {
      const list = props.exercises;
      return list.sort((exercise1, exercise2) => exercise1.id - exercise2.id);
    });

    return {
      orderedListExercise,
    };
  },
});
</script>
