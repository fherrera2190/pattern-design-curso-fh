/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(
      `%cEl jugador ${player.name} ha entrado en la sala secreta.`,
      COLORS.blue
    );
  }
}

// clase Proxy

class MagicPortal implements Room {
  private secretRoom: SecretRoom;

  constructor(room: SecretRoom) {
    this.secretRoom = room;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player);
      return;
    }
    console.log(
      `%cEl jugador ${player.name} no tiene suficiente nivel para entrar en la sala secreta.`,
      COLORS.red
    );
  }
}

function main() {
  const secretRoom = new SecretRoom();
  const magicPortal = new MagicPortal(secretRoom);
  const player1 = new Player("Juan", 15);
  const player2 = new Player("Nemesis", 5);

  magicPortal.enter(player1);

  magicPortal.enter(player2);
}

main();
