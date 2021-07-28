import { ref } from "vue";

const isLoading = ref(false);
export default function useLoading() {
  return {
    isLoading,
  };
}
