import GLHelper from './GLHelper';
import { FragmentShaderSource, VertexShaderSource } from './Shaders';

class Renderer {
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _program: WebGLProgram;

  constructor(private _gl: WebGL2RenderingContext) {
    this._vertexShader = GLHelper.createShader(
      _gl,
      VertexShaderSource,
      _gl.VERTEX_SHADER
    );
    this._fragmentShader = GLHelper.createShader(
      _gl,
      FragmentShaderSource,
      _gl.FRAGMENT_SHADER
    );
    this._program = GLHelper.createProgram(
      _gl,
      this._vertexShader,
      this._fragmentShader
    );
  }

  clear(gl = this._gl) {
    gl.clearColor(1, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

export default Renderer;
