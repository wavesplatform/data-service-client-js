const DataServiceClient = require('../index.ts').default;

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('{"data":[{ "data": 1 }]}'),
  })
);
const NODE_URL = 'NODE_URL';
const client = new DataServiceClient({ nodeUrl: NODE_URL });

test('Assets endpoint: fetch is called with correct params#1', async () => {
  const ids = [
    '4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca',
    'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa',
  ];
  await client.getAssets(...ids);
  expect(global.fetch).toBeCalledWith(
    `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca&ids[]=AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa`
  );
});

test('Assets endpoint: fetch is called with correct params#2', async () => {
  const ids = ['4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'];
  await client.getAssets(...ids);
  expect(global.fetch).toBeCalledWith(
    `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca`
  );
});

test('Assets endpoint: fetch is called with correct params#3', async () => {
  const ids = [];
  await client.getAssets(...ids);

  expect(global.fetch).toBeCalledWith(`${NODE_URL}/assets?`);
});

test('Assets endpoint: throws, if called with wrong types', async () => {
  const wrongTypes = [1, null, NaN, undefined, {}];
  wrongTypes.map(
    async t => await expect(client.getAssets(t)).rejects.toBeDefined()
  );
});
