<template>
  <teleport to="#modals" v-if="showErrorModal">
    <Modal @closed="closeModal">
      <h2>
        <font-awesome-icon :icon="faTimesCircle" size="lg" /><span
          >Problem request</span
        >
      </h2>
      <div>{{ messageError }}</div>
      <template v-slot:links>
        <button class="close-btn" @click="closeModal">Close</button>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useErrorModal from "@/composables/useErrorModal";
import Modal from "@/components/modal/Modal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  components: {
    Modal,
    FontAwesomeIcon,
  },
  setup() {
    const { showErrorModal, messageError } = useErrorModal();
    const closeModal = () => {
      showErrorModal.value = false;
      messageError.value = "";
    };
    return { showErrorModal, messageError, closeModal, faTimesCircle };
  },
});
</script>

<style lang="scss" scoped>
h2 {
  svg {
    height: 1em;
  }
  span {
    margin-left: 0.5em;
  }
}
.close-btn {
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
.close-btn:hover {
  color: black;
  background: #141f291c;
  font-weight: bold;
}
</style>