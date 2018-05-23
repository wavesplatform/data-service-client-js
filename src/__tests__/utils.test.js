const { createQS } = require('../utils');

test('Create querystring utils works #1', () => {
  const obj = { a: true, b: 1, c: 'string', e: [9, 8, 7] };
  const qs = createQS(obj);
  expect(qs).toBe('a=true&b=1&c=string&e[]=9&e[]=8&e[]=7');
});
