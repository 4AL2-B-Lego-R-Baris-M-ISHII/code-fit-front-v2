import CodeResult from "./code-result";

interface DtoCode {
  codeId: number;
  isResolved: boolean;
  content: string;
  listCodeResult: CodeResult[];
  resolvedDateTimestampSec: number;
}

export default DtoCode;
