import { IDisposable } from './IDisposable';
import { Renderer } from './rendering/Renderer';
import { GLUtil } from './rendering/GLUtil';
import { Logger } from './Logger';
import { IModel } from './rendering/models/IModel';
import { BlockModel } from './rendering/models/BlockModel';
import { Vec3 } from './math/Vec3';

export class Game implements IDisposable {
  private _renderer: Renderer;
  private _isPaused: boolean = false;
  private _logger = new Logger(Game);

  private _lastFrameTime = 0;
  private _frames = 0;
  private _lastFrameCountTime = 0;
  private _frameCountsPerSecond = 1;
  private _framesPerSecond = 120;

  private _models: IModel[] = [
    new BlockModel(new Vec3(-1, -1, -1.5)),
    new BlockModel(new Vec3(1, 0, -1)),
    new BlockModel(new Vec3(0, 1, -2)),
  ];

  public time = 0;

  constructor(canvas: HTMLCanvasElement, private _onQuit: () => void) {
    const gl = GLUtil.createWebGL2RenderingContext(canvas);
    const glUtil = new GLUtil(gl);
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
    this._loop();
  }

  private _update() {
    this._models.forEach((model) => model.update(this));
  }

  private _loop() {
    const thisTime = Date.now();
    if (thisTime - this._lastFrameTime >= 1000 / this._framesPerSecond) {
      this._update();
      this._renderer.render(this._models, this);
      this._lastFrameTime = thisTime;
      ++this._frames;
      ++this.time;
    }
    if (
      thisTime - this._lastFrameCountTime >=
      1000 / this._frameCountsPerSecond
    ) {
      this._logger.logInfo(`fps: ${this._frames * this._frameCountsPerSecond}`);
      this._lastFrameCountTime = thisTime;
      this._frames = 0;
    }
    requestAnimationFrame(() => this._loop());
  }

  private _pause() {
    this._logger.logInfo('Paused game!');
  }

  private _unPause() {
    this._logger.logInfo('Un-paused game!');
  }
}
