<template>
  <div class="signup">
    <h2>Sign up</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Username</label>
        <input type="text" required v-model="username" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" required v-model="password" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" required v-model="email" />
      </div>
      <div class="form-group">
        <div></div>
        <button>Submit</button>
      </div>
    </form>
    <div class="error-content">
      <div class="error-message" v-show="errorSignup">{{ errorSignup }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import useAuth from "@/composables/useAuth";
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
export default defineComponent({
  name: "Signup",
  setup() {
    const { signup } = useAuth();
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const errorSignup = ref(null);

    const handleSubmit = async () => {
      try {
        await signup(username.value, password.value, email.value);
      } catch (err) {
        errorSignup.value = err.message;
      }
    };

    return {
      username,
      password,
      email,
      handleSubmit,
      errorSignup,
    };
  },
});
</script>

<style lang="scss" scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 35px;
  }
  form {
    width: 75%;
    .form-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      input {
        min-width: 150px;
      }
      margin-bottom: 1em;
      button {
        float: right;
      }
    }
  }
  .error-content {
    font-size: 1.3em;
    color: red;
    min-height: 1.3em;
  }
}
</style>