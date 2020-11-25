import { Mat4 } from '../Mat4';
import { Vec4 } from '../Vec4';

function expectEquality(actual: Mat4, expected: Mat4): void {
  expect(actual.equals(expected)).toBeTruthy();
}

describe('Mat4', () => {
  test('multiply', () => {
    const actual = new Mat4(
      new Vec4(1, 2, 3, 4),
      new Vec4(5, 6, 7, 8),
      new Vec4(9, 10, 11, 12),
      new Vec4(13, 14, 15, 16)
    ).multiply(
      new Mat4(
        new Vec4(17, 18, 19, 20),
        new Vec4(21, 22, 23, 24),
        new Vec4(25, 26, 27, 28),
        new Vec4(29, 30, 31, 32)
      )
    );
    const expected = new Mat4(
      new Vec4(250, 260, 270, 280),
      new Vec4(618, 644, 670, 696),
      new Vec4(986, 1028, 1070, 1112),
      new Vec4(1354, 1412, 1470, 1528)
    );
    expectEquality(actual, expected);
  });

  test('inverse', () => {
    const actual = new Mat4(
      new Vec4(3, 5, 7, 2),
      new Vec4(1, 4, 7, 2),
      new Vec4(6, 3, 9, 17),
      new Vec4(13, 5, 4, 6)
    ).inverse();
    const det = 401;
    const expected = new Mat4(
      new Vec4(-347 / det, 333 / det, -34 / det, 101 / det),
      new Vec4(1095 / det, -1067 / det, 68 / det, -202 / det),
      new Vec4(-655 / det, 706 / det, -48 / det, 119 / det),
      new Vec4(276 / det, -303 / det, 49 / det, -63 / det)
    );
    expectEquality(actual, expected);
  });

  test('equals', () => {
    expect(
      new Mat4(
        new Vec4(1, 2, 3, 4),
        new Vec4(5, 6, 7, 8),
        new Vec4(9, 10, 11, 12),
        new Vec4(13, 14, 15, 16)
      ).equals(
        new Mat4(
          new Vec4(1, 2, 3, 4),
          new Vec4(5, 6, 7, 8),
          new Vec4(9, 10, 11, 12),
          new Vec4(13, 14, 15, 16)
        )
      )
    ).toBeTruthy();
  });
});
