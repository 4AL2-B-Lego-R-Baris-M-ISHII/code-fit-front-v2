<template>
  <div class="login">
    <div class="login-page">
      <div class="login-page-content">
        <h2>Coding is like a sport</h2>
        <div class="description">
          If you keep doing exercise at least 3 times a week you will be a
          better coder. Like every discipline
          <strong> TRAINING IS KEY </strong>. Our team prepare lot of exercises
          for you to be better on this exciting mental sport. Keep your coding
          skills fit !
        </div>
      </div>
      <div class="login-form">
        <h2>Please log in to keep training</h2>
        <form @submit.prevent="handleSubmit" class="login-form__content">
          <div class="form-group">
            <label>Username</label>
            <input type="text" required v-model="username" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" required v-model="password" />
          </div>
          <div class="form-group">
            <div class="space"></div>
            <button class="sign-up-btn" @click="goSignUpPage" type="button">
              Sign up ?
            </button>
            <button>Submit</button>
          </div>
        </form>
        <div class="error-content">
          <div class="error-message" v-show="errorLogin">{{ errorLogin }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAuth from "@/composables/useAuth";
import router from "@/router";
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

    const goSignUpPage = () => {
      router.push("signup");
    };
    return { username, password, handleSubmit, errorLogin, goSignUpPage };
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  .login-page {
    display: flex;
    scroll-behavior: smooth;
    width: 100%;

    min-height: 670px;

    justify-content: center;
    align-items: center;
    flex-wrap: wrap-reverse;
    h2 {
      text-align: center;
      font-size: 50px;
      margin-top: 0px;
    }
    .login-page-content {
      font-size: 1.7em;
      text-align: justify;
      display: flex;
      flex-direction: column;
      align-content: center;
      width: 50%;
      min-width: 350px;
      margin-bottom: 2em;
    }
    .login-form {
      display: flex;
      width: 50%;
      min-width: 350px;
      flex-direction: column;
      text-align: center;

      .sign-up-btn {
        border: none;
        color: #42b883;
        margin-right: 1em;
      }
      .sign-up-btn:hover {
        border: none;
        color: #35495e;
        background: #eee;
      }

      .error-content {
        font-size: 1.3em;
        color: red;
        min-height: 1.3em;
      }
    }
    @media (max-width: 1200px) {
      .login-page-content {
        width: 100%;
      }
      .login-form {
        width: 100%;
      }
      .container {
        margin: 0;
      }
    }
  }
}
</style>