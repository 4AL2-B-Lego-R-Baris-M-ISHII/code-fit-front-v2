<template>
  <section class="exercise-info">
    <div class="exercise-info__group">
      <h2>Exercise info</h2>
      <button @click="toggleEditExerciseModal">
        <font-awesome-icon :icon="faEdit" />Change Info
      </button>
    </div>

    <div class="exercise-info__group">
      <div>Title :</div>
      <div>{{ exercise.title }}</div>
    </div>
    <div class="exercise-info__group">
      <div>Description:</div>
      <div v-html="curDescriptionWithLineBreakHtml"></div>
    </div>
  </section>
  <EditExerciseModal
    :showEditExerciseModal="showEditExerciseModal"
    :exercise="exercise"
    @closed="toggleEditExerciseModal"
    @edited="updateEditExercise"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import DtoExercise from "@/types/exercise/dto-exercise";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditExerciseModal from "@/components/modal/exercise/EditExerciseModal.vue";

export default defineComponent({
  components: {
    FontAwesomeIcon,
    EditExerciseModal,
  },
  emits: ["exercise-edited"],
  props: {
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props, ctx) {
    const showEditExerciseModal = ref(false);
    const toggleEditExerciseModal = () => {
      showEditExerciseModal.value = !showEditExerciseModal.value;
    };

    const updateEditExercise = async (title: string, description: string) => {
      showEditExerciseModal.value = false;
      ctx.emit("exercise-edited", title, description);
    };

    const curDescriptionWithLineBreakHtml = computed(() => {
      const curDescription = props.exercise.description;
      if (curDescription === undefined) return "";
      return curDescription.replace(/\r?\n/g, "<br />");
    });

    return {
      toggleEditExerciseModal,
      faEdit,
      showEditExerciseModal,
      updateEditExercise,
      curDescriptionWithLineBreakHtml,
    };
  },
});
</script>

<style lang="scss" scoped>
.exercise-info {
  margin: 0.5em 0.5em;
  padding: 0.3em 1em;
  border: solid #eee;

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