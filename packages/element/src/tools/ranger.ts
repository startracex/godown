export class Ranger {
  readonly max: number;
  readonly min: number;
  readonly step?: number;
  readonly diff: number;

  constructor(endpoint1: number, endpoint2: number, step?: number) {
    this.max = Math.max(endpoint1, endpoint2);
    this.min = Math.min(endpoint1, endpoint2);
    this.diff = this.max - this.min;
    this.step = step;
  }

  present(decimal: number): number {
    return this.normalize(decimal * this.diff);
  }

  normalize(value: number): number {
    value = this.restrict(value);
    if (!this.step) {
      return value;
    }
    return this.min + Math.round((value - this.min) / this.step) * this.step;
  }

  restrict(value: number): number {
    return this.max <= value ? this.max : this.min >= value ? this.min : value;
  }
}

export default Ranger;
