import { Vec4 } from './Vec4';
import { Vec3 } from './Vec3';
import { degToRad } from './MathUtil';

export class Mat4 {
  constructor(
    public r0: Vec4,
    public r1: Vec4,
    public r2: Vec4,
    public r3: Vec4
  ) {}

  static identity() {
    return new Mat4(
      new Vec4(1, 0, 0, 0),
      new Vec4(0, 1, 0, 0),
      new Vec4(0, 0, 1, 0),
      new Vec4(0, 0, 0, 1)
    );
  }

  static perspective(
    fovYInDegrees: number,
    aspectRatio: number,
    near: number,
    far: number
  ): Mat4 {
    const f = Math.tan(degToRad(fovYInDegrees) * 0.5);
    const rangeInv = 1.0 / (near - far);
    return new Mat4(
      new Vec4(f / aspectRatio, 0, 0, 0),
      new Vec4(0, f, 0, 0),
      new Vec4(0, 0, (far + near) * rangeInv, -1),
      new Vec4(0, 0, 2 * far * near * rangeInv, 0)
    );
  }

  multiply(matrix: Mat4): Mat4 {
    return new Mat4(
      this.r0.multiplyByMatrix(matrix),
      this.r1.multiplyByMatrix(matrix),
      this.r2.multiplyByMatrix(matrix),
      this.r3.multiplyByMatrix(matrix)
    );
  }

  translate(x: number, y: number, z: number): Mat4 {
    return this.multiply(
      new Mat4(
        new Vec4(1, 0, 0, 0),
        new Vec4(0, 1, 0, 0),
        new Vec4(0, 0, 1, 0),
        new Vec4(x, y, z, 1)
      )
    );
  }

  scale(width: number, height: number, depth: number): Mat4 {
    return this.multiply(
      new Mat4(
        new Vec4(width, 0, 0, 0),
        new Vec4(0, height, 0, 0),
        new Vec4(0, 0, depth, 0),
        new Vec4(0, 0, 0, 1)
      )
    );
  }

  rotateX(angleInRadians: number): Mat4 {
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);
    return this.multiply(
      new Mat4(
        new Vec4(1, 0, 0, 0),
        new Vec4(0, cos, -sin, 0),
        new Vec4(0, sin, cos, 0),
        new Vec4(0, 0, 0, 1)
      )
    );
  }

  rotateY(angleInRadians: number): Mat4 {
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);
    return this.multiply(
      new Mat4(
        new Vec4(cos, 0, sin, 0),
        new Vec4(0, 1, 0, 0),
        new Vec4(-sin, 0, cos, 0),
        new Vec4(0, 0, 0, 1)
      )
    );
  }

  rotateZ(angleInRadians: number): Mat4 {
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);
    return this.multiply(
      new Mat4(
        new Vec4(cos, -sin, 0, 0),
        new Vec4(sin, cos, 0, 0),
        new Vec4(0, 0, 1, 0),
        new Vec4(0, 0, 0, 1)
      )
    );
  }

  lookAt(eye: Vec3, target: Vec3, upDirection: Vec3 = new Vec3(0, 1, 0)): Mat4 {
    const forward = eye.subtract(target).normalize();
    const side = upDirection.cross(forward).normalize();
    const up = forward.cross(side).normalize();
    return this.multiply(
      new Mat4(
        new Vec4(side.x, side.y, side.z, 0),
        new Vec4(up.x, up.y, up.z, 0),
        new Vec4(forward.x, forward.y, forward.z, 0),
        new Vec4(eye.x, eye.y, eye.z, 1)
      )
    );
  }

  transpose(): Mat4 {
    return new Mat4(
      new Vec4(this.r0.x, this.r1.x, this.r2.x, this.r3.x),
      new Vec4(this.r0.y, this.r1.y, this.r2.y, this.r3.y),
      new Vec4(this.r0.z, this.r1.z, this.r2.z, this.r3.z),
      new Vec4(this.r0.w, this.r1.w, this.r2.w, this.r3.w)
    );
  }

  inverse(): Mat4 {
    let b00 = this.r0.x * this.r1.y - this.r0.y * this.r1.x;
    let b01 = this.r0.x * this.r1.z - this.r0.z * this.r1.x;
    let b02 = this.r0.x * this.r1.w - this.r0.w * this.r1.x;
    let b03 = this.r0.y * this.r1.z - this.r0.z * this.r1.y;
    let b04 = this.r0.y * this.r1.w - this.r0.w * this.r1.y;
    let b05 = this.r0.z * this.r1.w - this.r0.w * this.r1.z;
    let b06 = this.r2.x * this.r3.y - this.r2.y * this.r3.x;
    let b07 = this.r2.x * this.r3.z - this.r2.z * this.r3.x;
    let b08 = this.r2.x * this.r3.w - this.r2.w * this.r3.x;
    let b09 = this.r2.y * this.r3.z - this.r2.z * this.r3.y;
    let b10 = this.r2.y * this.r3.w - this.r2.w * this.r3.y;
    let b11 = this.r2.z * this.r3.w - this.r2.w * this.r3.z;
    const det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    return new Mat4(
      new Vec4(
        (this.r1.y * b11 - this.r1.z * b10 + this.r1.w * b09) / det,
        (this.r0.z * b10 - this.r0.y * b11 - this.r0.w * b09) / det,
        (this.r3.y * b05 - this.r3.z * b04 + this.r3.w * b03) / det,
        (this.r2.z * b04 - this.r2.y * b05 - this.r2.w * b03) / det
      ),
      new Vec4(
        (this.r1.z * b08 - this.r1.x * b11 - this.r1.w * b07) / det,
        (this.r0.x * b11 - this.r0.z * b08 + this.r0.w * b07) / det,
        (this.r3.z * b02 - this.r3.x * b05 - this.r3.w * b01) / det,
        (this.r2.x * b05 - this.r2.z * b02 + this.r2.w * b01) / det
      ),
      new Vec4(
        (this.r1.x * b10 - this.r1.y * b08 + this.r1.w * b06) / det,
        (this.r0.y * b08 - this.r0.x * b10 - this.r0.w * b06) / det,
        (this.r3.x * b04 - this.r3.y * b02 + this.r3.w * b00) / det,
        (this.r2.y * b02 - this.r2.x * b04 - this.r2.w * b00) / det
      ),
      new Vec4(
        (this.r1.y * b07 - this.r1.x * b09 - this.r1.z * b06) / det,
        (this.r0.x * b09 - this.r0.y * b07 + this.r0.z * b06) / det,
        (this.r3.y * b01 - this.r3.x * b03 - this.r3.z * b00) / det,
        (this.r2.x * b03 - this.r2.y * b01 + this.r2.z * b00) / det
      )
    );
  }

  toFlatArray(): number[] {
    return [
      this.r0.x,
      this.r0.y,
      this.r0.z,
      this.r0.w,
      this.r1.x,
      this.r1.y,
      this.r1.z,
      this.r1.w,
      this.r2.x,
      this.r2.y,
      this.r2.z,
      this.r2.w,
      this.r3.x,
      this.r3.y,
      this.r3.z,
      this.r3.w,
    ];
  }

  equals(matrix: Mat4): boolean {
    return (
      this.r0.equals(matrix.r0) &&
      this.r1.equals(matrix.r1) &&
      this.r2.equals(matrix.r2) &&
      this.r3.equals(matrix.r3)
    );
  }
}
