import { Logger } from "jsr:@deno-library/logger";
import { COLORS } from "../../helpers/colors.ts";
interface ILoggerAdapter {
  file: string;

  writeLog(msg: string): void;
  writeWarning: (msg: string) => void;
  writeError(msg: string): void;
}

// TODO: Implementar el LoggerAdapter

export class DenoLoggerAdapter implements ILoggerAdapter {
  private logger = new Logger();
  public file: string;

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} Log] ${msg}`);
  }
  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} Warning] %c${msg}`, COLORS.yellow);
  }
  writeError(msg: string): void {
    this.logger.error(`[${this.file} Error] %c${msg}`, COLORS.red);
  }
}
