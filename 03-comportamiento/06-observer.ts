/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer) {
    this.subscribers.push(observer);
    console.log(`%cSe ha suscrito al canal ${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer) {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`Un subscriptor se ha dado de baja del canal ${this.name}`);
  }

  uploadVision(videoTitle: string) {
    console.log(
      `%cSe ha publicado un nuevo video en el canal ${this.name}: %c${videoTitle}`,
      COLORS.red,
      COLORS.yellow
    );
    this.notifySubscribers(videoTitle);
  }

  notifySubscribers(videoTitle: string) {
    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `%cEl subscriptor ${this.name} ha sido notificado de el video: %c${videoTitle}`,
      COLORS.blue,
      COLORS.yellow
    );
  }
}

function main() {

  const channel = new YouTubeChannel('Mi Canal de YouTube');
  const subscriber1 = new Subscriber('Subscriptor 1');
  const subscriber2 = new Subscriber('Subscriptor 2');


  channel.subscribe(subscriber1);
  channel.subscribe(subscriber2);
  channel.uploadVision('Nuevo video en mi canal de YouTube');
  channel.unsubscribe(subscriber2);


  channel.uploadVision('Video Nemesis');

}

main();
