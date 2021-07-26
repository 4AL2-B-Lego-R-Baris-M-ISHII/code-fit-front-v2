<template>
  <div class="user-exercise-info container">
    <div class="user-exercise-info__title">
      <h2>Title: {{ title }}</h2>
    </div>
    <div class="user-exercise-info__description">
      {{ curDescription }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      default: "",
      type: String,
    },
    description: {
      default: "",
      type: String,
    },
  },
  setup(props) {
    const lineBreak = computed(() => {
      const curDescription = props.description;
      return curDescription.replace(/\r?\n/g, "<br />");
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-exercise-info {
  &__description {
    margin: 1em;
    display: flex;
    text-align: justify;
  }
}
</style>