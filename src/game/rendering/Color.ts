export class Color {
  constructor(public r: number, public g: number, public b: number) {}

  static random() {
    return new Color(Math.random(), Math.random(), Math.random());
  }
}
