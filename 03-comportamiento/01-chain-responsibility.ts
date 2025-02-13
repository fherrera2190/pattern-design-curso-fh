/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// Soporte basico

class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basico") {
      console.log(
        "%cSoporte basico: Resolviendo problema basico",
        COLORS.green
      );
      return;
    }

    console.log(`Soporte basico, pasando al siguiente...`);
    super.handle(request);
  }
}

class AdvanceSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "avanzado") {
      console.log(
        "%cSoporte Avanzado: Resolviendo problema avanzado",
        COLORS.yellow
      );
      return;
    }

    console.log(
      `%cSoporte Avanzado, pasando el problema al siguiente...`,
      COLORS.yellow
    );
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "experto") {
      console.log(
        "%cSoporte Experto: Resolviendo problema experto",
        COLORS.blue
      );
      return;
    }

    console.log(`%cSoporte experto: No hay nada que hacer... `, COLORS.red);
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advanceSupport = new AdvanceSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advanceSupport).setNext(expertSupport);

  basicSupport.handle("avanzado");
}

main();
