<template>
  <div class="user-exercise-info">
    <div class="user-exercise-info__title">
      <h2>{{ title }}</h2>
      <div class="resolved" v-if="isResolved">
        <font-awesome-icon :icon="faCheck" />Resolved
      </div>
    </div>
    <div class="user-exercise-info__description">
      <div v-html="curDescriptionWithLineBreakHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
    isResolved: {
      required: true,
      type: Boolean,
    },
  },
  setup(props) {
    const curDescriptionWithLineBreakHtml = computed(() => {
      const curDescription = props.description;
      if (curDescription === undefined) return "";
      return curDescription.replace(/\r?\n/g, "<br />");
    });
    return { curDescriptionWithLineBreakHtml, faCheck };
  },
});
</script>

<style lang="scss" scoped>
.user-exercise-info {
  margin-bottom: 0 1em;
  &__title {
    display: flex;
    h2 {
      margin-right: 0.5em;
    }
    .resolved {
      :first-child {
        margin-right: 0.25em;
      }
    }
    align-items: center;
  }
  &__description {
    margin: 1em;
    display: flex;
    text-align: justify;
  }
}
</style>