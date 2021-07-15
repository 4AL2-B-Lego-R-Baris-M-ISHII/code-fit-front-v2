<template>
  <div class="create-exercise">
    <h1>Create exercise</h1>
    <form @submit.prevent="handleSubmit">
      <div class="top-part-exercise-form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" required v-model="title" />
        </div>
        <div class="form-group language-section">
          <label>Language</label>
          <select v-model="selectLanguage" required>
            <option v-for="language in languages" :key="language.id">
              {{ language.languageName }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group-textarea">
        <label>Description</label>
        <textarea cols="30" rows="10" v-model="description" required></textarea>
      </div>

      <div class="create-btn">
        <button>Create</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import DtoLanguage from "@/types/language/dto-language";
import { defineComponent, onMounted, ref } from "vue";
import useLanguage from "@/composables/useLanguage";
import useLoading from "@/composables/useLoading";
import useExercise from "@/composables/useExercise";

export default defineComponent({
  name: "CreateExercise",
  setup() {
    const title = ref("");
    const description = ref("");
    const selectLanguage = ref<string>();
    const languages = ref<DtoLanguage[]>([]);

    const { getAllLanguages } = useLanguage();
    const { createExercise } = useExercise();
    const { isLoading } = useLoading();

    const handleSubmit = () => {
      const languageName = selectLanguage.value;
      console.log(selectLanguage.value);
      if (languageName !== undefined) {
        console.log("creation of exercise wip");
        createExercise(title.value, description.value, languageName);
      }
    };

    onMounted(async () => {
      isLoading.value = true;
      try {
        languages.value = await getAllLanguages();
        selectLanguage.value = languages.value[0].languageName;
      } finally {
        isLoading.value = false;
      }
    });
    return { handleSubmit, title, description, selectLanguage, languages };
  },
});
</script>

<style lang="scss" scoped>
.create-exercise {
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 50%;
    .top-part-exercise-form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .form-group {
        padding: 0;
        margin-bottom: 1em;
        margin-right: 1em;
        font-size: 0.85em;
        flex-wrap: wrap;
        label {
          margin-right: 1em;
        }
        input {
          font-size: inherit;
          min-width: 15em;
          width: 70%;
        }
      }
    }

    .form-group-textarea {
      display: flex;
      flex-direction: column;
      font-size: 1.25em;
      label {
        margin: 0.5em 0;
      }

      textarea {
        margin-bottom: 1em;
      }
    }

    .create-btn {
      margin-top: 0.5em;
      text-align: right;
      button {
        cursor: pointer;
        margin-left: 1em;
        padding: 0.75em;
        font-size: 1em;
        background: #42b88311;
        border-color: #999;
        border-radius: 10%;
        width: 6em;
        color: #35495e;
        text-decoration: none;

        :first-child {
          margin-right: 0.5em;
        }
      }
      button:hover {
        color: black;
        background: #35495e11;
        font-weight: bold;
      }
    }
  }
}
</style>