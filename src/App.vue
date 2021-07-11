<template>
  <Nav />
  <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
  <router-view class="container" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Nav from "@/components/Nav.vue";

export default defineComponent({
  components: { Nav },
});
</script>


<style lang="scss">
#app {
  color: #2c3e50;
  height: 100%;
  margin: 0;
}
</style>
