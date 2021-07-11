import ErrorResponse from "@/types/ErrorResponse";
import jwtTokenUtils from "@/utils/jwtTokenUtils";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class UrlHelpers {
  url: string = process.env.VUE_APP_ROOT_URL;

  async get(path: string): Promise<Response> {
    const requestInfo = {
      method: RequestMethod.GET,
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtTokenUtils.getToken()}`,
      },
    };
    return await fetch(this.url + path, requestInfo);
  }
  async send<Req, Res>(
    method: RequestMethod,
    path: string,
    body: Req
  ): Promise<Res> {
    const requestInfo = {
      method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtTokenUtils.getToken()}`,
      },
    } as RequestInit;
    if (body !== undefined) {
      requestInfo["body"] = JSON.stringify(body);
    }
    const response = await fetch(this.url + path, requestInfo);
    const result = await response.json();
    if (!response.ok) {
      throw result as ErrorResponse;
    }
    return result as Res;
  }

  async sendNoContent<Req>(
    method: RequestMethod,
    path: string,
    body: Req
  ): Promise<void> {
    const requestInfo = {
      method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtTokenUtils.getToken()}`,
      },
    } as RequestInit;
    if (body !== undefined) {
      requestInfo["body"] = JSON.stringify(body);
    }
    const response = await fetch(this.url + path, requestInfo);
    if (!response.ok) {
      const result = await response.json();
      throw result as ErrorResponse;
    }
  }
}

export default new UrlHelpers();
