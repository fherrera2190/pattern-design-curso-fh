import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LocalLogger Class

export class LocalLogger {
  constructor(private file: string) {}

  writeLog(msg: string): void {
    console.log(`[${this.file} log] ${msg}`);
  }
  writeError(msg: string): void {
    console.log(`[${this.file} error] %c${msg}`, COLORS.red);
  }

  writeWarning(msg: string): void {
    console.log(`[${this.file} warning] %c${msg}`, COLORS.yellow);
  }
}
