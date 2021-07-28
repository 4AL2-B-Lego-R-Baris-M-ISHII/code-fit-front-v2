import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.scss";
import jwtTokenUtils from "./utils/jwtTokenUtils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import useAuth from "./composables/useAuth";

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

const publicPath = ["Login", "Signup", "NotFound"];
router.beforeEach((to, from, next) => {
  if (to.name !== undefined && to.name !== null && router.hasRoute(to.name)) {
    if (
      !publicPath.includes(to.name.toString()) &&
      jwtTokenUtils.getToken() === null
    ) {
      next({ name: "Login" });
    } else if (to.path.toString().includes("/admin")) {
      const { isAdmin, logout } = useAuth();
      isAdmin().then((isAdmin) => {
        if (!isAdmin) {
          console.warn("You are not authorized to ");
          logout();
        } else {
          next();
        }
      });
    } else next();
  }
});
