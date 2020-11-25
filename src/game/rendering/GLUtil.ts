import { Logger } from '../Logger';

export class GLUtil {
  private _logger = new Logger(GLUtil);

  constructor(private _gl: WebGL2RenderingContext) {}

  static createWebGL2RenderingContext(
    canvas: HTMLCanvasElement
  ): WebGL2RenderingContext {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      throw Error('No WebGL2!');
    }
    return gl;
  }

  configureResolution(theWindow: Window & typeof globalThis = window) {
    const resize = () => {
      this._gl.canvas.width = theWindow.innerWidth * theWindow.devicePixelRatio;
      this._gl.canvas.height =
        theWindow.innerHeight * theWindow.devicePixelRatio;
      this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
    };
    theWindow.onresize = resize;
    resize();
  }

  createShader(source: string, type: number): WebGLShader {
    const shader = this._gl.createShader(type);
    if (!shader) {
      throw Error('No shader created!');
    }
    this._gl.shaderSource(shader, source);
    this._gl.compileShader(shader);
    if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
      const info = this._gl.getShaderInfoLog(shader);
      if (info) this._logger.logInfo(info);
      this._gl.deleteShader(shader);
      throw Error('Failed to compile shader.');
    }
    return shader;
  }

  createProgramWithSources(
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): WebGLProgram {
    const vertexShader = this.createShader(
      vertexShaderSource,
      this._gl.VERTEX_SHADER
    );
    const fragmentShader = this.createShader(
      fragmentShaderSource,
      this._gl.FRAGMENT_SHADER
    );
    return this.createProgramWithShaders(vertexShader, fragmentShader);
  }

  createProgramWithShaders(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
    const program = this._gl.createProgram();
    if (!program) {
      throw Error('No shader program created!');
    }
    this._gl.attachShader(program, vertexShader);
    this._gl.attachShader(program, fragmentShader);
    this._gl.linkProgram(program);
    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
      const info = this._gl.getProgramInfoLog(program);
      if (info) this._logger.logInfo(info);
      this._gl.deleteProgram(program);
      throw Error('Shader failed to link!');
    }
    return program;
  }

  loseWebGLContext(): void {
    const loseContext = this._gl.getExtension('WEBGL_lose_context');
    if (!loseContext) {
      return;
    }
    loseContext.loseContext();
  }
}
