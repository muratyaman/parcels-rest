export function configInt(v?: string, def = '0'): number {
  return Number.parseInt(v ?? def, 10);
}

export function configBool(v?: string, def = false): boolean {
  return ['1', 'true', 'yes'].includes(v ?? '') || configInt(v, '0') !== 0;
}
