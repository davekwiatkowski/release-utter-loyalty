import { IDisposable } from './IDisposable';
import { Renderer } from './Renderer';
import { GLUtil } from './GLUtil';
import { Logger } from './Logger';

export class Game implements IDisposable {
  private _renderer: Renderer;
  private _isPaused: boolean = false;
  private _logger = new Logger(Game);

  constructor(canvas: HTMLCanvasElement, private _onQuit: () => void) {
    const gl = GLUtil.createWebGL2RenderingContext(canvas);
    const glUtil = new GLUtil(gl);
    glUtil.configureResolution();
    this._renderer = new Renderer(gl, glUtil);

    this._start();

    window.addEventListener('keydown', this._onKeyDown);
  }

  dispose(): void {
    this._logger.logInfo('Quit game!');
    this._renderer.dispose();
    window.removeEventListener('keydown', this._onKeyDown);
    this._onQuit();
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
        this.dispose();
      }
    }
  };

  private _start() {
    this._renderer.render();
  }

  private _pause() {
    this._logger.logInfo('Paused game!');
  }

  private _unPause() {
    this._logger.logInfo('Un-paused game!');
  }
}
