import router from "@/router";
import { ref } from "vue";
import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import DtoUser from "@/types/auth/dto-user";
import LoginRequest from "@/types/auth/LoginRequest";
import SignupRequest from "@/types/auth/SignupRequest";
import jwtTokenUtils from "@/utils/jwtTokenUtils";

const token = ref("");
const roles = ref<string[]>([]);

export default function useAuth() {
  const USER_ROLES = "userRoles";
  async function signup(
    username: string,
    password: string,
    email: string
  ): Promise<void> {
    const body = {
      username,
      password,
      email,
    } as SignupRequest;
    try {
      await urlHelpers.sendNoContent(RequestMethod.POST, "/auth/signup", body);
      router.push("/login");
    } catch (err) {
      const status = err.status;
      if (status !== undefined) {
        switch (status) {
          case 401:
            throw Error("You are not sign up");
          case 403:
            throw Error("You are probably already sign up");
          case undefined:
            throw Error(err.message);
          default:
            throw Error("Problem server, try later");
        }
      }
    }
  }

  async function login(username: string, password: string): Promise<void> {
    const body = {
      username,
      password,
    } as LoginRequest;
    try {
      const response: DtoUser = await urlHelpers.send(
        RequestMethod.POST,
        "/auth/signin",
        body
      );
      if (response.roles === undefined) {
        const errorResponse = (response as unknown) as Response;
        if (errorResponse.status === 401) throw Error("You are not signed up");
        throw Error("Problem server, try latter");
      }
      roles.value = response.roles;
      localStorage.setItem(USER_ROLES, `${roles.value}`);
      jwtTokenUtils.setToken(response.token);
      token.value = response.token;
      router.push("/");
    } catch (err) {
      if (err.status !== undefined) {
        if (err.status === 401) {
          throw Error("You are not sign up");
        }
        throw Error("Problem server, try later");
      }
      throw Error(err.message);
    }
  }

  async function logout() {
    const jwtTokenId = jwtTokenUtils.getToken();
    if (jwtTokenId === null) {
      console.warn("Logout a none login user");
    } else {
      jwtTokenUtils.removeToken();
    }
    localStorage.removeItem(USER_ROLES);
    token.value = "";
    roles.value = [];
    router.push("Login");
  }

  async function isLogin() {
    const jwtTokenId = jwtTokenUtils.getToken();
    if (jwtTokenId === null) {
      return;
    }
    token.value = jwtTokenId;
    return true;
  }

  async function isAdmin() {
    const userRoles = localStorage.getItem(USER_ROLES);
    return userRoles !== null && userRoles.includes("ROLE_ADMIN");
  }

  return {
    token,
    isAdmin,
    roles,
    signup,
    login,
    logout,
    isLogin,
  };
}
