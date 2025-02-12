/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  displayState() {
    console.log("%c\nEstado del editor:", COLORS.green);
    console.log(`
        Contenido: ${this.content}
        Cursor Position: ${this.cursorPosition}
        Cambios sin guardar: ${this.unsavedChanges}
        `);
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }
}

class CodeEditorHystory {
  private hystory: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.hystory.length - 1) {
      this.hystory = this.hystory.slice(0, this.currentIndex + 1);
    }
    this.hystory.push(state);
    this.currentIndex = this.hystory.length - 1;
  }
  redo(): CodeEditorState | null {
    if (this.currentIndex < this.hystory.length - 1) {
      this.currentIndex++;
      return this.hystory[this.currentIndex];
    }

    return null;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.hystory[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const hystory = new CodeEditorHystory();
  let editorState = new CodeEditorState(
    "console.log('Hello World');",
    2,
    false
  );

  hystory.save(editorState);
  console.log("%cEstado inicial:", COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hello World!');  \n console.log('nueva linea!');",
    cursorPosition: 3,
    unsavedChanges: true,
  });

  hystory.save(editorState);

  console.log("%cDespues del primer cambio:", COLORS.blue);
  editorState.displayState();

  console.log("%cDespues de mover el cursor:", COLORS.blue);

  editorState = editorState.copyWith({
    cursorPosition: 5,
  });
  hystory.save(editorState);
  editorState.displayState();

  console.log("%cDespues del undo:", COLORS.blue);
  editorState = hystory.undo()!;
  editorState.displayState();

  console.log("%cDespues del redo:", COLORS.blue);
  editorState = hystory.redo()!;
  editorState.displayState();
}

main();
