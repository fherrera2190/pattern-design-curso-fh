import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("Ataque con %cespada", COLORS.blue);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("Ataque con %cAxe", COLORS.gray);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("Ataque con %cmagia", COLORS.green);
  }
}

class FireBall implements Ability {
  use(): void {
    console.log("Ataque con %cfuego", COLORS.red);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability) {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("El guerrero esta listo para atacar");
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log("El mago se prepara para lanzar una magia");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();
  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();

  mage.setAbility(new FireBall());
  mage.performAbility();
}

main();
