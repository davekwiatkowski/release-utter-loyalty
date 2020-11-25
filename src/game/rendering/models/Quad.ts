import { Vec3 } from '../../math/Vec3';
import { Color } from '../Color';
import { IDrawable } from './IDrawable';
import { Triangle } from './Triangle';
import { Vertex } from './Vertex';

export class Quad implements IDrawable {
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
  ): Quad {
    return new Quad(
      new Vertex(p0, color),
      new Vertex(p1, color),
      new Vertex(p2, color),
      new Vertex(p3, color)
    );
  }

  getTriangles(): Triangle[] {
    return [
      new Triangle(this.v0, this.v1, this.v3),
      new Triangle(this.v3, this.v1, this.v2),
    ];
  }
}
