<template>
  <h1>Login</h1>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Username</label>
        <input type="text" required v-model="username" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" required v-model="password" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
    <div v-if="errorLogin">{{ errorLogin }}</div>
  </div>
</template>

<script lang="ts">
import useAuth from "@/composables/useAuth";
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    const { login } = useAuth();
    const username = ref("");
    const password = ref("");
    const errorLogin = ref(null);

    const handleSubmit = async () => {
      try {
        await login(username.value, password.value);
      } catch (err) {
        errorLogin.value = err.message;
      }
    };
    return { username, password, handleSubmit, errorLogin };
  },
});
</script>

<style>
</style>