import { Vec3 } from '../../math/Vec3';
import { Color } from '../Color';
import { Vertex } from './Vertex';

export class Triangle {
  static readonly VERTEX_COUNT = 3;

  constructor(public v0: Vertex, public v1: Vertex, public v2: Vertex) {}

  static fromPositionsAndColor(
    p0: Vec3,
    p1: Vec3,
    p2: Vec3,
    color: Color
  ): Triangle {
    return new Triangle(
      new Vertex(p0, color),
      new Vertex(p1, color),
      new Vertex(p2, color)
    );
  }
}
