import { configureResolution, createWebGL2 } from './GLUtils';
import { logInfo } from './Logger';
import Renderer from './Renderer';

class Game {
  private _renderer: Renderer;
  private _isPaused: boolean = false;

  constructor(private _canvas: HTMLCanvasElement, private _onQuit: () => void) {
    const gl = createWebGL2(_canvas);
    configureResolution(gl);
    this._renderer = new Renderer(gl);

    this._start();

    window.addEventListener('keydown', this._onKeyDown);
  }

  private _onKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'Escape') {
      if (this._isPaused) {
        this._isPaused = false;
        this._unPause();
      } else {
        this._isPaused = true;
        this._pause();
      }
    } else if (key === 'q') {
      if (this._isPaused) {
        this._quit();
      }
    }
  };

  private _start() {
    this._renderer.render();
  }

  private _pause() {
    logInfo('Paused game!');
  }

  private _unPause() {
    logInfo('Un-paused game!');
  }

  private _quit() {
    logInfo('Quit game!');
    this._renderer.dispose();
    window.removeEventListener('keydown', this._onKeyDown);
    this._onQuit();
  }
}

export default Game;
