import Renderer from './Renderer';

class Game {
  private _renderer: Renderer;

  constructor(private _canvas: HTMLCanvasElement) {
    const gl = this.initWebGL();
    this._renderer = new Renderer(gl);
    this._start();
  }

  pause() {
    // TODO: Handle disposal.
  }

  private _start() {
    this._renderer.clear();
  }

  private initWebGL(): WebGL2RenderingContext {
    const gl = this._canvas.getContext('webgl2');
    if (!gl) {
      throw Error('No WebGL2!');
    }
    return gl;
  }
}

export default Game;
