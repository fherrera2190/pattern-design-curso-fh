/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }
  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Reproductor de video encendido");
  }

  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log("Reproductor de video apagado");
  }

  off() {
    console.log("Reproductor de video apagado");
  }
}

class PopCornMaker {
  popingPopcorn() {
    console.log("Popcorn listo");
  }
  turnOffPopcorn() {
    console.log("Popcorn apagado");
  }
}

interface HomeTheaterFacedeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopCornMaker;
}
class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopCornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacedeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string) {
    console.log("%c Preparando para ver la pelicula", "color: green;");
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.popingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play("Pelicula");
    console.log("%cDisfrutando la pelicula...", COLORS.blue);
  }

  endWatchingMovie() {
    console.log("%cPreparando para detener la pelicula", "color: green;");

    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log("%cSistema Apagado", COLORS.blue);
  }
}

function main() {
  const homeTheaterFacade = new HomeTheaterFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popcornMaker: new PopCornMaker(),
  });

  homeTheaterFacade.watchMovie("Pelicula 1");
  homeTheaterFacade.endWatchingMovie();
}

main();
