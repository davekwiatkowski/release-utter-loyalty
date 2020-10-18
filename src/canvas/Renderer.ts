import { logInfo } from './Logger';

/* eslint-disable import/no-webpack-loader-syntax */
const fragmentShaderSource = require('raw-loader!glslify-loader!./shaders/shader.frag');
const vertexShaderSource = require('raw-loader!glslify-loader!./shaders/shader.vert');

class Renderer {
  constructor(private _gl: WebGL2RenderingContext) {
    // Create vertex shader
    const vertexShader = _gl.createShader(_gl.VERTEX_SHADER);
    if (!vertexShader) {
      throw Error('No vertex shader created!');
    }
    _gl.shaderSource(vertexShader, vertexShaderSource);
    _gl.compileShader(vertexShader);
    if (!_gl.getShaderParameter(vertexShader, _gl.COMPILE_STATUS)) {
      logInfo(this, 'Shader log info:', _gl.getShaderInfoLog(vertexShader));
      _gl.deleteShader(vertexShader);
      throw Error('Failed to compile shader.');
    }

    // Create fragment shader
    const fragmentShader = _gl.createShader(_gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      throw Error('No vertex shader created!');
    }
    _gl.shaderSource(fragmentShader, fragmentShaderSource);
    _gl.compileShader(fragmentShader);
    if (!_gl.getShaderParameter(fragmentShader, _gl.COMPILE_STATUS)) {
      logInfo(this, 'Shader log info:', _gl.getShaderInfoLog(fragmentShader));
      _gl.deleteShader(fragmentShader);
      throw Error('Failed to compile shader.');
    }

    // Set up the shader program
    const program = _gl.createProgram();
    if (!program) {
      throw Error('No shader program created!');
    }
    _gl.attachShader(program, vertexShader);
    _gl.attachShader(program, fragmentShader);
    _gl.linkProgram(program);
    if (!_gl.getProgramParameter(program, _gl.LINK_STATUS)) {
      logInfo(this, 'Program log info:', _gl.getProgramInfoLog(program));
      _gl.deleteProgram(program);
      throw Error('Shader failed to link!');
    }
  }

  clear(gl = this._gl) {
    gl.clearColor(1, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

export default Renderer;
