/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourIntoCup();
    this.addCondiments();
  }

  private boilWater(): void {
    console.log("Calentando agua...");
  }
  private pourIntoCup(): void {
    console.log("Llenando la taza...");
  }

  protected abstract addMainIngredient(): void;
  protected abstract addCondiments(): void;
}

class Tea extends HotBeverage {
  protected addMainIngredient(): void {
    console.log("Añadiendo una bolsa de te...");
  }
  protected addCondiments(): void {
    console.log("Añadiendo leche...");
  }
}

class Coffee extends HotBeverage {
  protected addMainIngredient(): void {
    console.log("Añadiendo una bolsa de cafe...");
  }
  protected addCondiments(): void {
    console.log("Añadiendo azucar...");
  }
}


function main(){
  const tea = new Tea();
  const coffee = new Coffee();
  tea.prepare();
//   coffee.prepare();
}

main();
