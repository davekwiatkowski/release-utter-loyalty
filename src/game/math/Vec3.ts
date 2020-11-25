export class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}

  static empty(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  add(vector: Vec3): Vec3 {
    return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtract(vector: Vec3): Vec3 {
    return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  multiply(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  divide(scalar: number): Vec3 {
    if (scalar === 0) return Vec3.empty();
    return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
  }

  negate(): Vec3 {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  magnitude(): number {
    return Math.sqrt(this.dot(this));
  }

  dot(vector: Vec3): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  normalize(): Vec3 {
    const magnitude = this.magnitude();
    if (magnitude === 0) {
      return Vec3.empty();
    }
    return this.divide(magnitude);
  }

  cross(vector: Vec3): Vec3 {
    return new Vec3(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }

  equals(vector: Vec3): boolean {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }
}
