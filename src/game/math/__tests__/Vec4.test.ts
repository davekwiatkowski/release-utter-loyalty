import { Mat4 } from '../Mat4';
import { Vec4 } from '../Vec4';

function expectEquality(actual: Vec4, expected: Vec4): void {
  expect(actual.equals(expected)).toBeTruthy();
}

describe('Vec4', () => {
  test('multiplyByMatrix', () => {
    const actual = new Vec4(1, 2, 3, 4).multiplyByMatrix(
      new Mat4(
        new Vec4(1, 2, 3, 4),
        new Vec4(5, 6, 7, 8),
        new Vec4(9, 10, 11, 12),
        new Vec4(13, 14, 15, 16)
      )
    );
    const expected = new Vec4(90, 100, 110, 120);
    expectEquality(actual, expected);
  });

  test('equals', () => {
    expect(new Vec4(1, 2, 3, 4).equals(new Vec4(1, 2, 3, 4))).toBeTruthy();
    expect(new Vec4(1, 2, 3, 4).equals(new Vec4(5, 6, 7, 8))).toBeFalsy();
  });
});
