import { logInfo } from './Logger';

export function createWebGL2(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    throw Error('No WebGL2!');
  }
  return gl;
}

export function configureResolution(
  gl: WebGL2RenderingContext,
  theWindow: Window & typeof globalThis = window
) {
  const resize = () => {
    gl.canvas.width = theWindow.innerWidth * theWindow.devicePixelRatio;
    gl.canvas.height = theWindow.innerHeight * theWindow.devicePixelRatio;
  };
  theWindow.onresize = resize;
  resize();
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

export function createShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw Error('No shader created!');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    logInfo('Shader log info:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw Error('Failed to compile shader.');
  }
  return shader;
}

export function createProgramWithSources(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram {
  const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(
    gl,
    fragmentShaderSource,
    gl.FRAGMENT_SHADER
  );
  return _createProgram(gl, vertexShader, fragmentShader);
}

function _createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) {
    throw Error('No shader program created!');
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    logInfo('Program log info:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    throw Error('Shader failed to link!');
  }
  return program;
}

export function loseWebGLContext(gl: WebGL2RenderingContext): void {
  const loseContext = gl.getExtension('WEBGL_lose_context');
  if (!loseContext) {
    return;
  }
  loseContext.loseContext();
}
