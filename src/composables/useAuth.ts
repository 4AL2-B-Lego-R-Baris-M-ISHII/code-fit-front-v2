import router from "@/router";
import { ref } from "vue";
import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import LoginResponse from "@/types/auth/LoginResponse";
import LoginRequest from "@/types/auth/LoginRequest";
import SignupRequest from "@/types/auth/SignupRequest";

const token = ref("");

export default function useAuth() {
  const JWT_TOKEN_ID = "JWT_TOKEN_ID";

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
      if (err.status !== undefined) {
        if (err.status === 401) {
          throw Error("You are not sign up");
        }
        throw Error("Problem server, try later");
      }
      throw Error(err.message);
    }
  }

  async function login(username: string, password: string): Promise<void> {
    const body = {
      username,
      password,
    } as LoginRequest;
    try {
      const response: LoginResponse = await urlHelpers.send(
        RequestMethod.POST,
        "/auth/signin",
        body
      );
      localStorage.setItem(JWT_TOKEN_ID, response.token);
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
    signup,
    login,
    logout,
    isLogin,
  };
}
