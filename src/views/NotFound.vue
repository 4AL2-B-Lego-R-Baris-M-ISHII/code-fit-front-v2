<template>
  <div class="not-found">
    <h2>404</h2>
    <h3>Page not found</h3>
    <div>
      <button @click="returnMainPath">Return to main page</button>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const returnMainPath = () => {
      router.push("/");
    };
    return {
      returnMainPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>