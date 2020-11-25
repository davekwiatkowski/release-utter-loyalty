import { Vec3 } from '../../math/Vec3';
import { Color } from '../Color';

export class Vertex {
  static readonly POSITION_DATA_COUNT = 3;
  static readonly COLOR_DATA_COUNT = 3;
  static readonly DATA_COUNT =
    Vertex.POSITION_DATA_COUNT + Vertex.COLOR_DATA_COUNT;

  constructor(public position: Vec3, public color: Color) {}
}
