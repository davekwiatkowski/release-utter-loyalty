import { Color } from '../Color';
import { IMesh } from './IMesh';
import { TriangleMesh } from './TriangleMesh';
import { Vertex } from './Vertex';
import { QuadMesh } from './QuadMesh';
import { Vec3 } from '../../math/Vec3';

export class QuadPrismMesh implements IMesh {
  private _q0: QuadMesh;
  private _q1: QuadMesh;
  private _q2: QuadMesh;
  private _q3: QuadMesh;
  private _q4: QuadMesh;
  private _q5: QuadMesh;

  constructor(
    public x0y0z0: Vertex, // bottom back left
    public x1y0z0: Vertex, // bottom back right
    public x1y0z1: Vertex, // bottom front right
    public x0y0z1: Vertex, // bottom front left
    public x0y1z0: Vertex, // top back left
    public x1y1z0: Vertex, // top back right
    public x1y1z1: Vertex, // top front right
    public x0y1z1: Vertex // top front left
  ) {
    this._q0 = new QuadMesh(this.x0y0z0, this.x0y0z1, this.x1y0z1, this.x1y0z0); // bottom
    this._q1 = new QuadMesh(this.x0y1z0, this.x1y1z0, this.x1y1z1, this.x0y1z1); // top
    this._q2 = new QuadMesh(this.x1y1z0, this.x0y1z0, this.x0y0z0, this.x1y0z0); // back
    this._q3 = new QuadMesh(this.x0y1z1, this.x1y1z1, this.x1y0z1, this.x0y0z1); // front
    this._q4 = new QuadMesh(this.x1y1z1, this.x1y1z0, this.x1y0z0, this.x1y0z1); // right
    this._q5 = new QuadMesh(this.x0y1z0, this.x0y1z1, this.x0y0z1, this.x0y0z0); // left
  }

  static fromPositionsAndColor(
    p0: Vec3,
    p1: Vec3,
    p2: Vec3,
    p3: Vec3,
    p4: Vec3,
    p5: Vec3,
    p6: Vec3,
    p7: Vec3,
    color: Color
  ): QuadPrismMesh {
    return new QuadPrismMesh(
      new Vertex(p0, color),
      new Vertex(p1, color),
      new Vertex(p2, color),
      new Vertex(p3, color),
      new Vertex(p4, color),
      new Vertex(p5, color),
      new Vertex(p6, color),
      new Vertex(p7, color)
    );
  }

  getTriangles(): TriangleMesh[] {
    return [
      ...this._q0.getTriangles(),
      ...this._q1.getTriangles(),
      ...this._q2.getTriangles(),
      ...this._q3.getTriangles(),
      ...this._q4.getTriangles(),
      ...this._q5.getTriangles(),
    ];
  }
}
