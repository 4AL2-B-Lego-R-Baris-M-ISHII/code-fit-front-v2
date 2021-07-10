import router from "@/router";
import SigninResponse from "@/types/auth/LoginResponse";
import ErrorResponse from "@/types/ErrorResponse";
import { ref } from "vue";

const token = ref("");

export default function useAuth() {
  const err = ref<null | string>(null);
  const JWT_TOKEN_ID = "JWT_TOKEN_ID";

  async function login(username: string, password: string): Promise<void> {
    try {
      const body = JSON.stringify({
        username,
        password,
      });
      const url = process.env.VUE_APP_ROOT_URL + "/auth/signin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        const result: ErrorResponse = await response.json();
        if (result.status === 401) {
          throw Error("You have to sign up to sign in");
        }
        throw Error("Problem server, try again later");
      }
      const result: SigninResponse = await response.json();

      localStorage.setItem(JWT_TOKEN_ID, result.token);
      token.value = result.token;
      router.push("Home");
    } catch (e) {
      throw Error(e.message);
    }
  }

  async function logout() {
    const jwtTokenId = localStorage.getItem(JWT_TOKEN_ID);
    if (jwtTokenId === null) {
      console.warn("Logout a none login user");
    } else {
      localStorage.removeItem(JWT_TOKEN_ID);
    }
    token.value = "";
    router.push("Login");
  }

  async function isLogin() {
    const jwtTokenId = localStorage.getItem(JWT_TOKEN_ID);
    if (jwtTokenId === null) {
      return;
    }
    token.value = jwtTokenId;
    return true;
  }

  return {
    token,
    login,
    logout,
    err,
    isLogin,
  };
}
