import { expect } from 'chai';
import { configBool, configInt, randStr } from '../src/utils';

describe('utils', () => {

  it('configBool should return false for "0"', () => {
    const out = configBool('0', false);
    expect(out).to.equal(false);
  });

  it('configBool should return false for ""', () => {
    const out = configBool('', false);
    expect(out).to.equal(false);
  });

  it('configBool should return false for "undefined"', () => {
    const out = configBool(undefined, false);
    expect(out).to.equal(false);
  });

  it('configBool should return false for "null"', () => {
    const out = configBool(null, false);
    expect(out).to.equal(false);
  });

  it('configBool should return true for "1"', () => {
    const out = configBool('1', true);
    expect(out).to.equal(true);
  });

  it('configBool should return true for "2"', () => {
    const out = configBool('2', true);
    expect(out).to.equal(true);
  });

  it('configBool should return true for "true"', () => {
    const out = configBool('true', false);
    expect(out).to.equal(true);
  });

  it('configBool should return true for "yes"', () => {
    const out = configBool('yes', false);
    expect(out).to.equal(true);
  });

  it('configInt should return 1 for "1"', () => {
    const out = configInt('1', 0);
    expect(out).to.equal(1);
  });

  it('randStr should return random string', () => {
    const out = randStr(10);
    expect(out.length).to.equal(10);
  });
});
