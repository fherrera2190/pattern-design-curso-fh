/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log("El pato nada rapidamente sobre el agua");
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("El pato vuela sobre el agua");
  }
}

class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("El pato camina por la orilla");
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`El pato ${this.name} esta listo para competir`);
  }

  performMove() {
    console.log(`${this.name} se preprara para moverse...`);
    this.movementStrategy.move();
  }

  setMovementStrategy(movementStrategy: MovementStrategy) {
    this.movementStrategy = movementStrategy;
    console.log(`${this.name} ha cambiado su estrategia de movimiento`);
  }
}

function main() {
  const duck1 = new Duck("Duck 1 rapido", new SwimFast());
  const duck2 = new Duck("Duck 2 volador", new FlyOverWater());
  const duck3 = new Duck("Duck 3 torpe", new WalkClumsily());

  console.log(`Comienza la carrera:`);
  duck1.performMove();
  duck2.performMove();

  duck3.performMove();
}

main();
