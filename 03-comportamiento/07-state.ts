/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingMoney(this);
  }

  inserMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(state: State) {
    this.state = state;
    console.log(`%cEstado cambiado a: ${state.name}`, COLORS.green);
  }

  getStateName() {
    return this.state.name;
  }
}
//Estados

class WaitingMoney implements State {
  public name: string = "Esperando Dinero";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Insertando dinero..., ahora puedes seleccionar un producto.");

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log(`%cPrimero debes insertar dinero`, COLORS.red);
  }
  dispenseProduct(): void {
    console.log("Entregando producto...");
  }
}

class ProductSelected implements State {
  public name: string = "Seleccionando Producto";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      `%cPor favor, seleccione un producto - dinero ya insertado`,
      COLORS.red
    );

    // this.vendingMachine.setState();
  }
  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
    console.log(`%cPrimero debes insertar dinero`, COLORS.red);
  }
  dispenseProduct(): void {
    console.log(
      `%cPor favor seleccione un producto - antes de despacharl`,
      COLORS.red
    );
  }
}

class DispensingProduct implements State {
  public name: string = "Despachando Producto";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      `%cPor favor aespera a que se entregue el producto`,
      COLORS.red
    );

    // this.vendingMachine.setState();
  }
  selectProduct(): void {
    // this.vendingMachine.setState()
    console.log(`%cProducto ya seleccionado y despachado`, COLORS.red);
  }
  dispenseProduct(): void {
    console.log(
      `%cProducto despachado, cambiando estado a esperando dinero`,
      COLORS.green
    );
    this.vendingMachine.setState(new WaitingMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Estado actual: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    selectedOption = prompt(`   
        1. Insertar dinero
        2. Seleccionar producto
        3. Entregar producto
        4. Salir

        Selecciona una opcion:
        `);

    switch (selectedOption) {
      case "1":
        vendingMachine.inserMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo del simulador...");
        break;
      default:
        console.log("Opcion no valida");
        break;
    }
    await sleep(3000);
  } while (selectedOption !== "4");
}

main();
