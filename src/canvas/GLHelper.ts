// TODO: Do things...

import { logInfo } from './Logger';

class GLHelper {
  static createShader(
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
      logInfo(this, 'Shader log info:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw Error('Failed to compile shader.');
    }
    return shader;
  }

  static createProgram(
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
      logInfo(this, 'Program log info:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw Error('Shader failed to link!');
    }
    return program;
  }
}

export default GLHelper;
