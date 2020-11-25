import { Vec3 } from '../Vec3';

function expectEquality(actual: Vec3, expected: Vec3): void {
  expect(actual.equals(expected)).toBeTruthy();
}

describe('Vec3', () => {
  test('add', () => {
    expectEquality(new Vec3(1, 2, 3).add(new Vec3(4, 5, 6)), new Vec3(5, 7, 9));
    expectEquality(new Vec3(4, 5, 6).add(new Vec3(1, 2, 3)), new Vec3(5, 7, 9));
  });

  test('subtract', () => {
    expectEquality(
      new Vec3(1, 2, 3).subtract(new Vec3(4, 5, 6)),
      new Vec3(-3, -3, -3)
    );
  });

  test('multiply', () => {
    expectEquality(new Vec3(1, 2, 3).multiply(4), new Vec3(4, 8, 12));
  });

  test('divide', () => {
    expectEquality(new Vec3(1, 2, 3).divide(4), new Vec3(1 / 4, 2 / 4, 3 / 4));
  });

  test('negate', () => {
    expectEquality(new Vec3(1, 2, 3).negate(), new Vec3(-1, -2, -3));
  });

  test('magnitude', () => {
    expect(new Vec3(1, 2, 3).magnitude()).toEqual(Math.sqrt(14));
  });

  test('dot', () => {
    expect(new Vec3(1, 2, 3).dot(new Vec3(4, 5, 6))).toEqual(4 + 10 + 18);
    expect(new Vec3(4, 5, 6).dot(new Vec3(1, 2, 3))).toEqual(4 + 10 + 18);
  });

  test('normalize', () => {
    expectEquality(
      new Vec3(1, 2, 3).normalize(),
      new Vec3(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
    );
  });

  test('cross', () => {
    expectEquality(
      new Vec3(1, 2, 3).cross(new Vec3(4, 5, 6)),
      new Vec3(-3, 6, -3)
    );
    expectEquality(
      new Vec3(4, 5, 6).cross(new Vec3(1, 2, 3)),
      new Vec3(3, -6, 3)
    );
  });

  test('equals', () => {
    expect(new Vec3(1, 2, 3).equals(new Vec3(1, 2, 3))).toBeTruthy();
    expect(new Vec3(1, 2, 3).equals(new Vec3(4, 5, 6))).toBeFalsy();
  });
});
