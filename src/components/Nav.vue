<template>
  <div>
    <header class="nav">
      <div class="nav__logo">
        <img src="@/assets/img/dumbell.png" alt="dumbell logo" />
        <div class="nav__logo__title">Code fit</div>
      </div>

      <button v-if="token" @click="logout">logout</button>
    </header>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useAuth from "@/composables/useAuth";

export default defineComponent({
  name: "Nav",
  setup() {
    const { logout, isLogin, token } = useAuth();
    isLogin();

    return {
      logout,
      token,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__logo {
    margin-left: 1.5em;
    display: flex;
    align-items: center;
    img {
      height: 50px;
    }
    font-weight: bold;
    &__title {
      margin: 0.5em;
      font-size: 2em;
    }
  }

  &__logo:hover {
    color: #666666;
    cursor: pointer;
  }
  button {
    font-size: 1em;
    font-weight: bolder;
    background: inherit;
    padding: 1.5em;
    margin-right: 1em;
    cursor: pointer;
    border: none;
  }
  button:hover {
    color: #666666;
    font-weight: bolder;
  }
}
hr {
  margin: 0 1em;
}
</style>