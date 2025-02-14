/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Niño en montañan Rusas: $${rollerCoaster.getPrice() * 0.5}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Niño en Casa del Terror: $${hauntedHouse.getPrice() * 0.7}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Niño en Ruedas de la Fortuna: $${ferrisWheel.getPrice() * 0.6}`
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Adulto en montañan Rusas: $${rollerCoaster.getPrice()}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Adulto en Casa del Terror: $${hauntedHouse.getPrice()}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(`Adulto en Rueda de la Fortuna: $${ferrisWheel.getPrice()}`);
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto en montañan Rusas: $${rollerCoaster.getPrice() * 0.85}`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto en Casa del Terror: $${hauntedHouse.getPrice() * 0.85}`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto en Rueda de la Fortuna: $${ferrisWheel.getPrice() * 0.85}`
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log(`Montañan Rusas: $${new RollerCoaster().getPrice()}`);
  console.log(`Casa del Terror: $${new HauntedHouse().getPrice()}`);
  console.log(`Rueda de la Fortuna: $${new FerrisWheel().getPrice()}`);

  console.log(`\nVisita de un niño`);
  const childVisitor = new ChildVisitor();
  attractions.forEach((attraction) => attraction.accept(childVisitor));
}

main();
