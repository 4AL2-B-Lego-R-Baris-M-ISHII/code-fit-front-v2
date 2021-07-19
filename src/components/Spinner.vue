<template>
  <div class="spinner-background" v-if="isLoading">
    <div class="img-container">
      <img src="../assets/img/spinner.svg" alt="spinner" />
    </div>
  </div>
</template>

<script lang="ts">
import useLoading from "@/composables/useLoading";

export default {
  name: "Spinner",
  setup() {
    const { isLoading } = useLoading();

    return {
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.spinner-background {
  top: 0;
  position: fixed;
  //background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  .img-container {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>