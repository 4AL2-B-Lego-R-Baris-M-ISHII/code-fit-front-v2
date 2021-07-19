<template>
  <teleport to="#modals" v-if="showConfirmationModal">
    <Modal @close="closeModal">
      <h2>{{ title }}</h2>
      <p>Whould you confirm your action ?</p>
      <button class="confirm-btn" @click="confirm">Confirm</button>
      <button class="cancel-btn" @click="closeModal">Cancel</button>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";

export default defineComponent({
  components: {
    Modal
  }
  setup() {},
});
</script>

<style lang="scss" scoped>
</style>