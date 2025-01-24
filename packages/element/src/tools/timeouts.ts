type TimeoutId = undefined | number | { [Symbol.toPrimitive](): number };

export class Timeouts {
  private inner = new Set<number>();

  add(t: TimeoutId): number | undefined {
    if (t === undefined) {
      return;
    }
    t = +t;
    if (this.inner.has(t)) {
      clearTimeout(t);
    }
    this.inner.add(t);
    return t;
  }

  remove(t: TimeoutId): undefined {
    if (t === undefined) {
      return;
    }
    t = +t;
    clearTimeout(t);
    this.inner.delete(t);
  }

  removeAll(): void {
    this.inner.forEach(clearTimeout);
    this.inner.clear();
  }
}
