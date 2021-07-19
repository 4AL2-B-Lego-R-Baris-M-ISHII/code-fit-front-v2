import { ref } from "vue";

const showErrorModal = ref(false);
const messageError = ref("");
export default function useErrorModal() {
  function openErrorModal(message: string) {
    showErrorModal.value = true;
    messageError.value = message;
  }
  return {
    showErrorModal,
    messageError,
    openErrorModal,
  };
}
