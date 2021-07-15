import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/logged/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Admin from "../views/admin/Admin.vue";
import AdminExercise from "../views/admin/AdminExercise.vue";
import NotFound from "../views/NotFound.vue";
import CreateExercise from "../views/admin/CreateExercise.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/admin/create-exercise",
    name: "CreateExercise",
    component: CreateExercise,
  },
  {
    path: "/admin/exercise",
    name: "AdminExercise",
    component: AdminExercise,
  },
  // catchall 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
