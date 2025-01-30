import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`
      CPU: ${this.cpu}
      RAM: ${this.ram}
      STORAGE: ${this.storage}
      GPU: ${this.gpu ?? "-"}
      `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCpu(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;

    return this;
  }

  setRam(ram: string): ComputerBuilder {
    this.computer.ram = ram;

    return this;
  }
  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;

    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;

    return this;
  }

  build(): Computer {
    return this.computer;
  }
}
function main() {
  const basicComputer: Computer = new ComputerBuilder()
    .setCpu("Intel Core i5")
    .setRam("8GB")
    .setStorage("500GB")
    .build();

  console.log("%cComputadora Básica:", COLORS.blue);
  basicComputer.displayConfiguration();

  const gamingComputer: Computer = new ComputerBuilder()
    .setCpu("Intel Core i7")
    // .setRam("16GB")
    .setRam("64GB")
    .setStorage("1TB")
    .setGPU("RTX 3090")
    .build();

  console.log("%cComputadora Básica:", COLORS.blue);
  gamingComputer.displayConfiguration();
}

main();
