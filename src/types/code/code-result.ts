import DtoLanguage from "../language/dto-language";

interface CodeResult {
  id: number;
  codeState: string;
  output: string;
  language: DtoLanguage;
  testId: number;
  position: number;
}

export default CodeResult;
