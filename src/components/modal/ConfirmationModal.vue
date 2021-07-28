<template>
  <teleport to="#modals" v-if="showConfirmationModal">
    <Modal @close="$emit('closed')">
      <h2>{{ title }}</h2>
      <p>Whould you confirm your action ?</p>
      <template v-slot:links>
        <button class="confirm-btn" @click="$emit('confirm')">Confirm</button>
        <button class="cancel-btn" @click="$emit('closed')">Cancel</button>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["closed", "confirm"],
  props: {
    title: {
      required: true,
      type: String,
    },
    showConfirmationModal: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
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
</style>