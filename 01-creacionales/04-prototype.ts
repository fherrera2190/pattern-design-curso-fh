/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
  public title: string;
  private content: string;
  public author: string;
  public constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  displayInfo() {
    console.log(`
            Titulo: ${this.title}
            Contenido: ${this.content}
            Autor: ${this.author}
            `);
  }

  clone() {
    return new Document(this.title, this.content, this.author);
  }
}

function main() {
  const document1 = new Document("Cotizacion", "500 Dolares", "Fernando");
  console.log({ document1 });
  document1.displayInfo();

  const document2 = { ...document1 };
  document2.title = "Nueva cotizacion";
  console.log({ document2 });
  //document2.displayInfo(); Property 'displayInfo' does not exist on type '{ title: string; content: string; author: string; }'
  document1.displayInfo();

  //   const document2 = structuredClone(document1);
  //   document2.title = "Nueva cotizacion";

  //   console.log({ document2 });
  //   document2.displayInfo();
  //En ambos casos se pierde el adn "Document"

//   const document2 = document1.clone();
//   document2.title = "Nueva cotizacion";
//   console.log({ document2 });
//   document2.displayInfo();
}
main();
