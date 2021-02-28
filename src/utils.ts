export function configInt(v?: string, def = 0): number {
  let n = Number.parseInt(v ?? String(def), 10);
  if (isNaN(n)) n = def;
  return n;
}

export function configBool(v?: string, def = false): boolean {
  let b = def;
  if (v) { // not undefined, not null
    b = ['1', 'true', 'yes'].includes(v);
    if (b) return b;
  }
  return configInt(v, 0) !== 0;
}

const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function randStr(N = 10) {
  return Array(N).join().split(',').map(() => s.charAt(Math.floor(Math.random() * s.length))).join('');
}
