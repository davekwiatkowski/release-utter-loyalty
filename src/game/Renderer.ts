import { GLUtil } from './GLUtil';
import { IDisposable } from './IDisposable';
import { FragmentShaderSource, VertexShaderSource } from './Shaders';

export class Renderer implements IDisposable {
  private _program: WebGLProgram;

  constructor(private _gl: WebGL2RenderingContext, private _glUtil: GLUtil) {
    // Program
    this._program = _glUtil.createProgramWithSources(
      VertexShaderSource,
      FragmentShaderSource
    );
    _gl.useProgram(this._program);

    // Attributes
    const positionsData = new Float32Array([0, 0, 0, 0.5, 0.7, 0]);
    _gl.bindBuffer(_gl.ARRAY_BUFFER, _gl.createBuffer());
    _gl.bufferData(_gl.ARRAY_BUFFER, positionsData, _gl.STATIC_DRAW);
    _gl.bindVertexArray(_gl.createVertexArray()); // Attribute state
    const positionAttribLocation = _gl.getAttribLocation(
      this._program,
      'a_position'
    );
    _gl.enableVertexAttribArray(positionAttribLocation);
    _gl.vertexAttribPointer(positionAttribLocation, 2, _gl.FLOAT, false, 0, 0);

    // Uniforms
    const colorUniformLocation = this._gl.getUniformLocation(
      this._program,
      'u_color'
    );
    this._gl.uniform4f(
      colorUniformLocation,
      Math.random(),
      Math.random(),
      Math.random(),
      1
    );
  }

  dispose(): void {
    this._glUtil.loseWebGLContext();
  }

  render() {
    this._clear();
    this._drawArrays();
  }

  private _drawArrays() {
    this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
  }

  private _clear() {
    this._gl.clearColor(1, 0, 1, 1);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  }
}
