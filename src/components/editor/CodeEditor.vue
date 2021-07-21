<template>
  <textarea v-model="content" id="editor"></textarea>
</template>

<script lang="ts">
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/clike/clike.js";
import { defineComponent, onMounted, ref } from "vue";

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
  },
  setup(props, ctx) {
    const content = ref(props.defaultContent);
    const mapLanguageMode = new Map<string, string>();
    mapLanguageMode.set("C11", "text/x-csrc");
    mapLanguageMode.set("JAVA8", "text/x-java");
    onMounted(() => {
      const textarea = document.getElementById("editor") as HTMLTextAreaElement;
      const editor = CodeMirror.fromTextArea(textarea, {
        mode: mapLanguageMode.get(props.language),
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        autofocus: true,
        theme: "eclipse",
      });

      editor.on("change", () => {
        ctx.emit("contentChange", editor.getValue());
      });
    });
    return {
      content,
    };
  },
});
</script>

