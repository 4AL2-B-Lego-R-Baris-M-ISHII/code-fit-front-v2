import urlHelpers, { RequestMethod } from "@/helpers/UrlHelpers";
import DtoCode from "@/types/code/dto-code";
import PostCodeRequest from "@/types/code/request/PostCodeRequest";

export default function useCode() {
  const CODE_PATH = "/code";
  async function saveCodeAndCompile(
    codeContent: string,
    exerciseCaseId: number
  ): Promise<DtoCode | undefined> {
    const request = {
      codeContent,
      exerciseCaseId,
      toCompile: true,
    } as PostCodeRequest;
    return await urlHelpers.send<PostCodeRequest, DtoCode>(
      RequestMethod.POST,
      CODE_PATH,
      request
    );
  }
  return { saveCodeAndCompile };
}
