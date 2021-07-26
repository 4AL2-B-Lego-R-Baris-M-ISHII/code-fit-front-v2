<template>User exercise</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    exerciseId: {
      required: true,
      type: String,
    },
    exerciseCaseId: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    // console.log(props.exerciseId);
    // console.log(props.exerciseCaseId);
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>