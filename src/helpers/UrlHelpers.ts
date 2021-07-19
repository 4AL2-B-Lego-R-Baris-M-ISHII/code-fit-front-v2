import ErrorResponse from "@/types/ErrorResponse";
import jwtTokenUtils from "@/utils/jwtTokenUtils";
import useAuth from "@/composables/useAuth";
import router from "@/router";

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
    const response = await fetch(this.url + path, requestInfo);
    if (!response.ok) {
      await this.manageErrorResponse(response);
    }
    return response;
  }

  async post<Req>(path: string, body: Req): Promise<number> {
    const method = RequestMethod.POST;
    const requestInfo = {
      method,
      mode: "cors",
      cache: "default",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtTokenUtils.getToken()}`,
      },
      body: JSON.stringify(body),
    } as RequestInit;
    const request = new Request(this.url + path, requestInfo);
    const responsePost = await fetch(request);

    if (!responsePost.ok) {
      this.manageErrorResponse(responsePost);
    }
    const location = responsePost.headers.get("location");
    if (location === null) {
      throw Error("No location of the post method");
    }
    return this.getIdOfLocation(location);
  }

  private getIdOfLocation(location: string): number {
    const matches = /\S+\/(\d+)/.exec(location);
    if (matches === null) throw Error("Problem matching in location");

    return parseInt(matches[1]);
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
      this.manageErrorResponse(response);
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
      this.manageErrorResponse(response);
    }
  }

  private async manageErrorResponse(response: Response) {
    switch (response.status) {
      case 401: {
        console.error("Problem authorization");
        const { logout } = useAuth();
        await logout();
        break;
      }
      default: {
        throw response;
      }
    }
  }
}

export default new UrlHelpers();
