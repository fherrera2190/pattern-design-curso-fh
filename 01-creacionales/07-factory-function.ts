/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Languaje = "en" | "es" | "fr";

//i18n
function createGreeter(lang: Languaje) {
  return function (name: string) {
    console.log(name);
    const messages = {
      es: `Hola, %c${name}`,
      en: `Hello, %c${name}`,
      fr: `Bonjour, %c${name}`,
    };
    return console.log(messages[lang], COLORS.red);
  };
}

function main() {
  const spanishGreeter = createGreeter("es");
  const englishGreeter = createGreeter("en");
  spanishGreeter("Sergio");
  englishGreeter("Alice");
}

main();
