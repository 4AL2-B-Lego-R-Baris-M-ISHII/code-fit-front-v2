<template>
<div class="hav">
  Nav
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useAuth from "@/composables/useAuth";

export default defineComponent({
  name: "Nav",
  setup() {
    const { logout, isLogin, token } = useAuth();
    isLogin();

    return {
      logout,
      token,
    };
  }
});
</script>

<style scoped>

</style>