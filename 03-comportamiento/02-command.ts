/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log(`%c Luz encendida`, COLORS.yellow);
  }

  turnOff(): void {
    console.log(`%c Luz apagada`, COLORS.blue);
  }
}

class Fan {
  turnOn(): void {
    console.log(`%cEl ventilador esta encendido`, COLORS.red);
  }

  turnOff(): void {
    console.log(`%cEl ventilador esta apagado`, COLORS.red);
  }
}

// Commandos

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.turnOn();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.turnOff();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log(`%cNo hay un comando para el botón ${button}`, COLORS.red);
  }
}

function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const button = prompt("Introduce un botón (1, 2, 3 o 4): ") ?? "";
    remoteControl.pressButton(button);

    const continueProgramResponse = prompt(
      "\nDeseas continuar? (s/n)"
    )?.toLocaleLowerCase();

    continueProgram = continueProgramResponse === "n" ? false : true;
  } while (continueProgram);
}

main();
