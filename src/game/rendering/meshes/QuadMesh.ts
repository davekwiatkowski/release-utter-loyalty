import { Vec3 } from '../../math/Vec3';
import { Color } from '../Color';
import { IMesh } from './IMesh';
import { TriangleMesh } from './TriangleMesh';
import { Vertex } from './Vertex';

export class QuadMesh implements IMesh {
  constructor(
    public v0: Vertex,
    public v1: Vertex,
    public v2: Vertex,
    public v3: Vertex
  ) {}

  static fromPositionsAndColor(
    p0: Vec3,
    p1: Vec3,
    p2: Vec3,
    p3: Vec3,
    color: Color
  ): QuadMesh {
    return new QuadMesh(
      new Vertex(p0, color),
      new Vertex(p1, color),
      new Vertex(p2, color),
      new Vertex(p3, color)
    );
  }

  getTriangles(): TriangleMesh[] {
    return [
      new TriangleMesh(this.v0, this.v1, this.v3),
      new TriangleMesh(this.v3, this.v1, this.v2),
    ];
  }
}
