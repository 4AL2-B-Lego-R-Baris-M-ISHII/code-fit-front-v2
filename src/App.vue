<template>
  <Nav />
  <Spinner />
  <ErrorModal />
  <router-view class="container" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Nav from "@/components/Nav.vue";
import Spinner from "@/components/Spinner.vue";
import ErrorModal from "@/components/modal/ErrorModal.vue";

export default defineComponent({
  components: { Nav, Spinner, ErrorModal },
});
</script>


<style lang="scss">
#app {
  color: #2c3e50;
  height: 100%;
  margin: 0;
}
</style>
