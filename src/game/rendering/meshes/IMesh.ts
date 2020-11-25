import { TriangleMesh } from './TriangleMesh';

export interface IMesh {
  getTriangles(): TriangleMesh[];
}
