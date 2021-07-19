import { ref } from "vue";

const showErrorModal = ref(false);
const messageError = ref("");
export default function useErrorModal() {
  function openErrorModal(message: string) {
    messageError.value = message;
  }
  return {
    showErrorModal,
    messageError,
    openErrorModal,
  };
}
