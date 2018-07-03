import { createQS, pipeP } from '../utils';

describe('Create querystring util', () => {
  it('works #1', () => {
    const obj = { a: true, b: 1, c: 'string', e: [9, 8, 7] };
    const qs = createQS(obj);
    expect(qs).toBe('?a=true&b=1&c=string&e=9&e=8&e=7');
  });
  it('works with Date (custom serialization)', () => {
    const now = new Date();
    const obj = { a: true, b: 1, c: 'string', d: now, e: [9, 8, 7] };

    const qs = createQS(obj);
    expect(qs).toBe(`?a=true&b=1&c=string&d=${now.toISOString()}&e=9&e=8&e=7`);
  });
  it('ignores undefined fields', () => {
    const obj = { a: true, b: 1, c: 'string', e: [9, 8, 7], d: undefined };
    const qs = createQS(obj);
    expect(qs).toBe('?a=true&b=1&c=string&e=9&e=8&e=7');
  });
});

describe('PipeP ', () => {
  const fn = pipeP(
    a => [a],
    b => [...b, 3]
  );
  it('wraps 2 args in array', async () => {
    const result = await fn(1, 2);
    expect(result).toEqual([[1, 2], 3]);
  });
  it("doesn't wrap 1 arg in array", async () => {
    const result = await fn(1);
    expect(result).toEqual([1, 3]);
  });
});
