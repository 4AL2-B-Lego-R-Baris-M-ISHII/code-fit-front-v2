<template>
  <div class="user-exercise-info">
    <div class="user-exercise-info__title">
      <h2>{{ title }}</h2>
    </div>
    <div class="user-exercise-info__description">
      <div v-html="curDescriptionWithLineBreakHtml"></div>
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
    const curDescriptionWithLineBreakHtml = computed(() => {
      const curDescription = props.description;
      if (curDescription === undefined) return "";
      return curDescription.replace(/\r?\n/g, "<br />");
    });
    return { curDescriptionWithLineBreakHtml };
  },
});
</script>

<style lang="scss" scoped>
.user-exercise-info {
  margin-bottom: 0 1em;
  &__description {
    margin: 1em;
    display: flex;
    text-align: justify;
  }
}
</style>