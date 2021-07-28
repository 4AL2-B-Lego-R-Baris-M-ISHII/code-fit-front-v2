<template>
  <div class="item-code-result" :class="isSuccess ? 'success' : 'error'">
    <div>{{ name }} : {{ isSuccess ? "SUCCESS" : "FAIL" }}</div>
    <div v-if="codeResult.output.length > 0" class="output">
      {{ codeResult.output }}
    </div>
  </div>
</template>

<script lang="ts">
import CodeResult from "@/types/code/code-result";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    codeResult: {
      required: true,
      type: Object as PropType<CodeResult>,
    },
    name: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const isSuccess = computed(() => {
      return props.codeResult.codeState === "SUCCESS";
    });
    return { isSuccess };
  },
});
</script>


<style lang="scss" scoped>
.item-code-result {
  padding: 1em;
  border-radius: 0.3em;
  .success {
    background: #42b8833a;
  }
  .error {
    background: #b8424244;
  }
  .output {
    margin: 0.5em;
    padding: 1em;
    border-radius: 0.3em;
    color: white;
    background: grey;
  }
}
</style>