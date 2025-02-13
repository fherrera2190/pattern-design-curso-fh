/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }
}

class Game {
  private level: number = 1;
  private health: number = 100;
  private position: string = "inicio";

  constructor() {
    console.log(
      `Jugando en el nivel ${this.level}, con ${this.health} de salud y en la posición ${this.position}`
    );
  }
  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
        Jugando en el nivel ${this.level}, con ${this.health} de salud y en la posición ${this.position}`);
  }

  retore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `Partida restaurada en el nivel ${this.level}, con ${this.health} de salud y en la posición ${this.position}`
    );
  }
}

class GameHistory {
  private history: GameMemento[] = [];

  push(memento: GameMemento): void {
    this.history.push(memento);
  }

  pop(): GameMemento | undefined {
    return this.history.pop();
  }
}

function main() {
  const game = new Game();

  const history = new GameHistory();

  history.push(game.save());

  //   game.play(2, 80, "casa");

  game.play(3, 60, "ciudad");

  history.push(game.save());

  game.play(4, 40, "castillo");

  console.log(`Estado actual`);

  game.retore(history.pop()!);

  console.log(`Despues de restorar el estado anterior`);
  game.retore(history.pop()!);

  console.log(`Despues de restorar el estado anterior`);
}

main();
