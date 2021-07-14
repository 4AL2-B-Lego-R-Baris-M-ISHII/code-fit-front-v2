import urlHelpers from "@/helpers/UrlHelpers";
import DtoLanguage from "@/types/language/dto-language";

export default function useLanguage() {
  async function getAllLanguages(): Promise<DtoLanguage[]> {
    const LANGUAGE_PATH = "/language";
    let result: DtoLanguage[] = [];
    try {
      const response = await urlHelpers.get(LANGUAGE_PATH);
      result = await response.json();
    } catch (err) {
      console.error(err);
    }
    return result;
  }
  return {
    getAllLanguages,
  };
}
