import ErrorResponse from "@/types/ErrorResponse";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class UrlHelpers {
  url: string = process.env.VUE_APP_ROOT_URL;

  async get(path: string) {
    const requestInfo = {
      method: RequestMethod.GET,
      headers: {
        Accept: "*/*",
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
      },
    } as any;
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
}

export default new UrlHelpers();
