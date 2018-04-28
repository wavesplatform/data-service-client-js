const DataServiceClient = require('../index.ts').default;

var fetchMock = jest.fn(() =>
  Promise.resolve({ text: () => Promise.resolve('1') })
);
// jest.doMock('node-fetch', () => ({ default: fetch }));
const nf = require('node-fetch');
nf.default = fetchMock;

const client = new DataServiceClient({ nodeUrl: 'http://localhost:3000' });

test('Assets endpoint: fetch is called with correct params#1', async () => {
  const ids = [
    '4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca',
    'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa',
  ];
  await client.getAssets(...ids);
  expect(fetchMock).toBeCalledWith(
    'http://localhost:3000/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca&ids[]=AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa'
  );
});

test('Assets endpoint: fetch is called with correct params#2', async () => {
  const ids = ['4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'];
  await client.getAssets(...ids);
  expect(fetchMock).toBeCalledWith(
    'http://localhost:3000/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'
  );
});

test('Assets endpoint: fetch is called with correct params#3', async () => {
  const ids = [];
  await client.getAssets(...ids);

  expect(fetchMock).toBeCalledWith('http://localhost:3000/assets?');
});

test('Assets endpoint: throws, if called with wrong types', async () => {
  const wrongTypes = [1, null, NaN, undefined, {}];
  wrongTypes.map(
    async t => await expect(client.getAssets(t)).rejects.toBeDefined()
  );
});
