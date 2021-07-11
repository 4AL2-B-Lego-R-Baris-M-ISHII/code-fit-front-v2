import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.scss";
import jwtTokenUtils from "./utils/jwtTokenUtils";

createApp(App)
  .use(router)
  .mount("#app");

router.beforeEach((to, from, next) => {
  if (
    to.name !== "Login" &&
    to.name !== "Signup" &&
    jwtTokenUtils.getToken() === null
  )
    next({ name: "Login" });
  // if the user is not authenticated, `next` is called twice
  else next();
});
