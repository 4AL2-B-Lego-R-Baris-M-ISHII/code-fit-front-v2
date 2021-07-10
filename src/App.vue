<template>
  <Nav />
  <div v-if="token">
    <h3>nav</h3>
    <button @click="logout">logout</button>
  </div>
  <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import useAuth from "./composables/useAuth";
import Nav from "@/components/Nav.vue";

export default defineComponent({
  components: {Nav},
  setup() {
    const { logout, isLogin, token } = useAuth();
    isLogin();

    return {
      logout,
      token,
    };
  },
});
</script>


<style>
#app {
  color: #2c3e50;
}
</style>
