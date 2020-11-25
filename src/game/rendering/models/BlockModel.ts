import { Game } from '../../Game';
import { Mat4 } from '../../math/Mat4';
import { degToRad } from '../../math/MathUtil';
import { Vec3 } from '../../math/Vec3';
import { Color } from '../Color';
import { IMesh } from '../meshes/IMesh';
import { QuadPrismMesh } from '../meshes/QuadPrismMesh';
import { Vertex } from '../meshes/Vertex';
import { IModel } from './IModel';

export class BlockModel implements IModel {
  public mesh: IMesh;
  public matrix: Mat4;

  constructor(public position: Vec3) {
    this.mesh = new QuadPrismMesh(
      new Vertex(new Vec3(-0.5, -0.5, -0.5), Color.random()),
      new Vertex(new Vec3(+0.5, -0.5, -0.5), Color.random()),
      new Vertex(new Vec3(+0.5, -0.5, +0.5), Color.random()),
      new Vertex(new Vec3(-0.5, -0.5, +0.5), Color.random()),
      new Vertex(new Vec3(-0.5, +0.5, -0.5), Color.random()),
      new Vertex(new Vec3(+0.5, +0.5, -0.5), Color.random()),
      new Vertex(new Vec3(+0.5, +0.5, +0.5), Color.random()),
      new Vertex(new Vec3(-0.5, +0.5, +0.5), Color.random())
    );

    this.matrix = Mat4.identity().translate(
      this.position.x,
      this.position.y,
      this.position.z
    );
  }

  update(game: Game): void {
    this.matrix = Mat4.identity()
      .rotateX(degToRad(0.5))
      .rotateY(degToRad(0.7))
      .multiply(this.matrix);
  }
}
