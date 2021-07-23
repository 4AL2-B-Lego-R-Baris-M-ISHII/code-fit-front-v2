<template>
  <div class="list-code-result">
    <h3>Output</h3>
    <div class="list-code-result__container">
      <div
        v-for="codeResult in orderedListCodeResult"
        :key="codeResult"
        class="item-code-result"
      >
        <ItemAdminCodeResult
          :codeResult="codeResult"
          :name="'test ' + codeResult.position"
        />
      </div>
      <div v-if="listCodeResult.length === 0">
        Not output, click on <strong>Verify</strong> to get output of exercise
        case
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CodeResult from "@/types/code/code-result";
import { computed, defineComponent, PropType } from "vue";

import ItemAdminCodeResult from "@/components/exercise/list-code-result/ItemAdminCodeResult.vue";

export default defineComponent({
  components: {
    ItemAdminCodeResult,
  },
  props: {
    listCodeResult: {
      default: [] as PropType<CodeResult[]>,
      type: Object as PropType<CodeResult[]>,
    },
  },
  setup(props) {
    const orderedListCodeResult = computed(() => {
      const listCodeResult = props.listCodeResult;
      if (listCodeResult.length <= 0) return [];
      listCodeResult.sort(
        (codeResult1, codeResult2) =>
          codeResult1.position - codeResult2.position
      );

      return listCodeResult;
    });

    return { orderedListCodeResult };
  },
});
</script>

<style lang="scss" scoped>
.list-code-result {
  &__container {
    overflow-y: scroll;
    scroll-behavior: auto;
    height: 400px;
  }
  .item-code-result {
    margin: 0 0.5em;
  }
}
</style>