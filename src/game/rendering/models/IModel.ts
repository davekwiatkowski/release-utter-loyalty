import { Game } from '../../Game';
import { Mat4 } from '../../math/Mat4';
import { IMesh } from '../meshes/IMesh';

export interface IModel {
  mesh: IMesh;
  matrix: Mat4;
  update(game: Game): void;
}
