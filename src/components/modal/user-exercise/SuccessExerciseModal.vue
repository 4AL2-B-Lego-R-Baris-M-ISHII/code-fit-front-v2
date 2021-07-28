<template>
  <teleport to="#modals" v-if="showModal">
    <Modal @closed="$emit('closed')">
      <div class="title">
        <h3>Congratulation, you resolved exercise</h3>
      </div>

      <template v-slot:links>
        <div class="links">
          <button
            class="buttons-section__return-list-btn"
            @click="handleSubmit"
          >
            Return to exercise list
          </button>
          <button class="buttons-section__cancel-btn" @click="$emit('closed')">
            Close
          </button>
        </div>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    const handleSubmit = () => {
      router.push({ name: "Home" });
    };
    return { handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
.buttons-section {
  display: flex;
  &__return-list-btn {
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    background: #35495e11;
    border: none;
    border-radius: 10%;
    color: #35495e;
    text-decoration: none;
  }
  &__return-list-btn:hover {
    color: black;
    background: #8bc4ce21;
    font-weight: bold;
  }
  &__cancel-btn {
    padding: 0.5em 1em;
    border: none;
    cursor: pointer;
    cursor: pointer;
    margin-left: 1em;
    padding: 0.75em;
    background: #35495e11;
    border-color: #999;
    border-radius: 10%;
    width: 6em;
    color: #35495e;
    text-decoration: none;
  }
  &__cancel-btn:hover {
    color: black;
    background: #ca444446;
    font-weight: bold;
  }
}
</style>