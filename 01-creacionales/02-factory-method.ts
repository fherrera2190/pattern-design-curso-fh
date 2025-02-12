/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

interface Hamburger {
  prepare(): void;
}

class ChickenBurger implements Hamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de Pollo");
  }
}

class BeefBurger implements Hamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de Carne");
  }
}

class BeanBurger implements Hamburger {
  prepare(): void {
    console.log("Preparando Hamburguesa de Bean");
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;
  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenBurgerRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenBurger();
  }
}

class BeefBurgerRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefBurger();
  }
}

class BeefBeanRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeanBurger();
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt("¿Que hamburguesa deseas? %c(chicken/beef/bean)");
  switch (burgerType) {
    case "chicken":
      restaurant = new ChickenBurgerRestaurant();
      break;
    case "beef":
      restaurant = new BeefBurgerRestaurant();
      break;
    case "bean":
      restaurant = new BeefBeanRestaurant();
      break;
    default:
      console.log("Hamburguesa no disponible");
      return;
  }
  restaurant.orderHamburger();
}

main();
