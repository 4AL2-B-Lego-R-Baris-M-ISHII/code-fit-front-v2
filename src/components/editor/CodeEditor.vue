<template>
  <textarea v-model="content" :id="id"></textarea>
</template>

<script lang="ts">
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/clike/clike.js";
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";

export default defineComponent({
  props: {
    language: {
      default: "C11",
      type: String,
    },
    defaultContent: {
      default: "",
      type: String,
    },
    id: {
      default: "editor",
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    const content = ref("");
    const mapLanguageMode = new Map<string, string>();
    mapLanguageMode.set("C11", "text/x-csrc");
    mapLanguageMode.set("JAVA8", "text/x-java");

    onMounted(() => {
      const textarea = document.getElementById(props.id) as HTMLTextAreaElement;
      const editor = CodeMirror.fromTextArea(textarea, {
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        autofocus: true,
        theme: "eclipse",
      });
      content.value = "nooop";

      editor.on("change", () => {
        ctx.emit("contentChange", editor.getValue());
      });

      watch(props, () => {
        content.value = props.defaultContent;
        editor.setValue(content.value);
        editor.setOption("mode", mapLanguageMode.get(props.language));
      });
    });

    return {
      content,
    };
  },
});
</script>

