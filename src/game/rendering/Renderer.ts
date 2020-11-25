import { GLUtil } from './GLUtil';
import { IDisposable } from '../IDisposable';
import { TriangleMesh } from './meshes/TriangleMesh';
import { FragmentShaderSource, VertexShaderSource } from './Shaders';
import { Vertex } from './meshes/Vertex';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';
import { IModel } from './models/IModel';
import { Game } from '../Game';

export class Renderer implements IDisposable {
  private _program: WebGLProgram;

  private _mvpMatrixLocation: WebGLUniformLocation | null;
  private _positionAttribLocation: number;

  constructor(private _gl: WebGL2RenderingContext, private _glUtil: GLUtil) {
    _glUtil.configureResolution();

    this._program = _glUtil.createProgramWithSources(
      VertexShaderSource,
      FragmentShaderSource
    );

    this._mvpMatrixLocation = _gl.getUniformLocation(
      this._program,
      'u_mvpMatrix'
    );

    this._positionAttribLocation = _gl.getAttribLocation(
      this._program,
      'a_position'
    );

    _gl.frontFace(_gl.CW);
    _gl.enable(_gl.CULL_FACE);

    _gl.enable(_gl.DEPTH_TEST);
    _gl.depthFunc(_gl.LEQUAL);

    _gl.useProgram(this._program);
  }

  dispose(): void {
    this._glUtil.loseWebGLContext();
  }

  render(models: IModel[], game: Game) {
    const cameraPosition = new Vec3(0, 0, 2);
    const cameraTarget = new Vec3(0, 0, 0);

    // Create and set model view projection matrix
    const projectionMatrix = Mat4.perspective(
      90,
      this._gl.canvas.width / this._gl.canvas.height,
      0.1,
      200
    );
    const viewMatrix = Mat4.identity()
      .lookAt(cameraPosition, cameraTarget)
      .inverse();
    const viewProjectionMatrix = Mat4.identity()
      .multiply(viewMatrix)
      .multiply(projectionMatrix);

    // Draw
    this._clear();

    models.forEach((model) => {
      const modelViewProjectionMatrix = model.matrix.multiply(
        viewProjectionMatrix
      );
      this._gl.uniformMatrix4fv(
        this._mvpMatrixLocation,
        false,
        modelViewProjectionMatrix.toFlatArray()
      );
      this._drawArrays(model.mesh.getTriangles());
    });
  }

  private _drawArrays(triangles: TriangleMesh[], _gl = this._gl) {
    const vertexData = this._createVertexDataFromTriangles(triangles);
    _gl.bindBuffer(_gl.ARRAY_BUFFER, _gl.createBuffer());
    _gl.bufferData(_gl.ARRAY_BUFFER, vertexData, _gl.STATIC_DRAW);
    _gl.bindVertexArray(_gl.createVertexArray()); // Attribute state

    _gl.enableVertexAttribArray(this._positionAttribLocation);
    _gl.vertexAttribPointer(
      this._positionAttribLocation,
      Vertex.POSITION_DATA_COUNT,
      _gl.FLOAT,
      false,
      Vertex.DATA_COUNT * 4,
      0 * 4
    );
    const colorAttribLocation = _gl.getAttribLocation(this._program, 'a_color');
    _gl.enableVertexAttribArray(colorAttribLocation);
    _gl.vertexAttribPointer(
      colorAttribLocation,
      Vertex.COLOR_DATA_COUNT,
      _gl.FLOAT,
      false,
      Vertex.DATA_COUNT * 4,
      Vertex.POSITION_DATA_COUNT * 4
    );

    this._gl.drawArrays(
      this._gl.TRIANGLES,
      0,
      triangles.length * TriangleMesh.VERTEX_COUNT
    );
  }

  private _createVertexDataFromTriangles(
    triangles: TriangleMesh[]
  ): Float32Array {
    const vertexDataSize =
      triangles.length * Vertex.DATA_COUNT * TriangleMesh.VERTEX_COUNT;
    const vertexData = new Float32Array(vertexDataSize);
    for (let ti = 0; ti < triangles.length; ++ti) {
      const t = triangles[ti];
      const vertexKeys = Object.keys(t) as (keyof TriangleMesh)[];
      for (let vi = 0; vi < TriangleMesh.VERTEX_COUNT; ++vi) {
        const vertexDataIndex =
          ti * Vertex.DATA_COUNT * TriangleMesh.VERTEX_COUNT +
          Vertex.DATA_COUNT * vi;
        const vertex = t[vertexKeys[vi]];
        vertexData[vertexDataIndex + 0] = vertex.position.x;
        vertexData[vertexDataIndex + 1] = vertex.position.y;
        vertexData[vertexDataIndex + 2] = vertex.position.z;
        vertexData[vertexDataIndex + 3] = vertex.color.r;
        vertexData[vertexDataIndex + 4] = vertex.color.g;
        vertexData[vertexDataIndex + 5] = vertex.color.b;
      }
    }
    return vertexData;
  }

  private _clear() {
    this._gl.clearColor(0, 0, 0, 1);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  }
}
