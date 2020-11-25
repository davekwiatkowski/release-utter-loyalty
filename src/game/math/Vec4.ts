import { Mat4 } from './Mat4';

export class Vec4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number
  ) {}

  multiplyByMatrix(matrix: Mat4): Vec4 {
    return new Vec4(
      this.x * matrix.r0.x +
        this.y * matrix.r1.x +
        this.z * matrix.r2.x +
        this.w * matrix.r3.x,
      this.x * matrix.r0.y +
        this.y * matrix.r1.y +
        this.z * matrix.r2.y +
        this.w * matrix.r3.y,
      this.x * matrix.r0.z +
        this.y * matrix.r1.z +
        this.z * matrix.r2.z +
        this.w * matrix.r3.z,
      this.x * matrix.r0.w +
        this.y * matrix.r1.w +
        this.z * matrix.r2.w +
        this.w * matrix.r3.w
    );
  }

  equals(vector: Vec4): boolean {
    return (
      this.x === vector.x &&
      this.y === vector.y &&
      this.z === vector.z &&
      this.w === vector.w
    );
  }
}
