/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

// ChatRoom

class ChatRoom {
  private users: User[] = [];

  public title: string;

  constructor(title: string) {
    this.title = title;
  }
  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string) {
    const userToSend = this.users.filter((user) => user !== sender);

    for (const user of userToSend) {
      user.receive(sender, message);
    }
  }
}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;

    this.chatRoom.addUser(this);
  }

  receive(sender: User, message: string) {
    console.log(
      `${this.username} recibiendo mensaje: ${message} de ${sender.username}`
    );
  }

  sendMessage(message: string) {
    console.log(`${this.username} envia mensaje: ${message}`);
    this.chatRoom.sendMessage(this, message);
  }
}
function main() {
  const chatRoom = new ChatRoom("Grupo de trabajo");

  const user1 = new User("John", chatRoom);
  const user2 = new User("Alice", chatRoom);
  const user3 = new User("Bob", chatRoom);

  user1.sendMessage('Hola a todos!');
  user2.sendMessage('Hola John!');
  user3.sendMessage('Hola a todos!');
}

main();
