<template>
  <teleport to="#modals" v-if="showEditExerciseModal">
    <Modal @closed="$emit('closed')">
      <div class="edit-exercise-form">
        <h2>Edit exercise title and description</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="title" />
          </div>
          <div class="error-message" v-if="isTitleError">
            Title is not correct
          </div>
          <div class="form-group-textarea">
            <label>Description</label>
            <textarea cols="30" rows="10" v-model="description"></textarea>
          </div>
          <div class="error-message" v-if="isDescriptionError">
            Description is not correct
          </div>
          <div class="form-group form-group-btn">
            <button class="confirm-btn">Confirm</button>
            <button type="button" class="cancel-btn" @click="$emit('closed')">
              Cancel
            </button>
          </div>
        </form>
        <div class="error-message" v-if="isErrorRequest">
          {{ errorMessage }}
        </div>
      </div>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import Modal from "@/components/modal/Modal.vue";
import DtoExercise from "@/types/exercise/dto-exercise";
import useExercise from "@/composables/useExercise";

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["edited", "closed"],
  props: {
    showEditExerciseModal: {
      required: true,
      type: Boolean,
    },
    exercise: {
      required: true,
      type: Object as PropType<DtoExercise>,
    },
  },
  setup(props, ctx) {
    const title = ref("");
    const description = ref("");
    const errorMessage = ref("");
    const isTitleError = ref(false);
    const isDescriptionError = ref(false);
    const isErrorRequest = ref(false);
    let isSubmit = false;

    const { updateExercise } = useExercise();

    function isFormValid() {
      isTitleError.value = title.value.trim().length <= 0;
      isDescriptionError.value = description.value.trim().length <= 0;
      return !isTitleError.value && !isDescriptionError.value;
    }

    const handleSubmit = async () => {
      isSubmit = true;
      try {
        if (isFormValid()) {
          await updateExercise(
            props.exercise.id,
            title.value,
            description.value
          );
          ctx.emit("edited", title.value, description.value);
        }
      } catch (err) {
        isErrorRequest.value = true;
        errorMessage.value = err;
      }
    };
    watch(props, () => {
      if (props.showEditExerciseModal === true) {
        title.value = props.exercise.title;
        description.value = props.exercise.description;
      }
    });
    watch([title, description], () => {
      isErrorRequest.value = false;
      if (isSubmit) {
        isFormValid();
      }
    });

    return {
      title,
      description,
      handleSubmit,
      errorMessage,
      isErrorRequest,
      isTitleError,
      isDescriptionError,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
}
.edit-exercise-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1em;
  h2 {
    text-align: center;
  }
  form {
    width: 100%;
    .form-group {
      padding: 0.5em 0;
      justify-content: space-between;
      input {
        font-size: inherit;
      }
      label {
        font-size: 1.25em;
      }
    }
    .form-group-textarea {
      display: flex;
      flex-direction: column;
      label {
        margin: 0.5em 0;
        font-size: 1.25em;
      }

      textarea {
        margin-bottom: 1em;
      }
    }
    .form-group-btn {
      justify-content: flex-end;
      button {
        margin-left: 1em;
      }
      .confirm-btn {
        padding: 0.5em 1em;
        border: none;
        cursor: pointer;
        margin-left: 1em;
        padding: 0.75em;
        font-size: 1em;
        background: #35495e11;
        border-color: #999;
        border-radius: 10%;
        width: 6em;
        color: #35495e;
        text-decoration: none;
      }
      .confirm-btn:hover {
        color: black;

        background: #42b88311;
        font-weight: bold;
      }
      .cancel-btn {
        padding: 0.5em 1em;
        border: none;
        cursor: pointer;
        cursor: pointer;
        margin-left: 1em;
        padding: 0.75em;
        font-size: 1em;
        background: #35495e11;
        border-color: #999;
        border-radius: 10%;
        width: 6em;
        color: #35495e;
        text-decoration: none;
      }
      .cancel-btn:hover {
        color: black;
        background: #ca444446;
        font-weight: bold;
      }
    }
  }
}
.actions {
  margin: 1em;
}
</style>