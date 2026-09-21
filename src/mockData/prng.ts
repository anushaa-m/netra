/** Deterministic 32-bit PRNG so the demo story stays coherent across pages. */
export function hash32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function noise(seed: string, t: number) {
  const rnd = mulberry32(hash32(`${seed}:${Math.floor(t * 2)}`));
  return rnd() * 2 - 1;
}

export function jitter(seed: string, t: number, amplitude: number) {
  return noise(seed, t) * amplitude;
}
