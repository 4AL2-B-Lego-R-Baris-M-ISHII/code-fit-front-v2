import { ref } from "vue";

const title = ref("");
const showErrorModal = ref(false);
const messageError = ref("");
export default function useErrorModal() {
  function openErrorModalWithTitle(newTitle: string, message: string) {
    title.value = newTitle;
    openErrorModal(message);
  }
  function openErrorModal(message: string) {
    showErrorModal.value = true;
    messageError.value = message;
  }
  return {
    openErrorModalWithTitle,
    title,
    showErrorModal,
    messageError,
    openErrorModal,
  };
}
