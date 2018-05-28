const DataServiceClient = require('../index.ts').default;
const { AssetPair } = require('@waves/data-entities');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('{"data":[{ "data": 1 }]}'),
  })
);
const NODE_URL = 'NODE_URL';
const client = new DataServiceClient({ nodeUrl: NODE_URL });

describe('Asssets endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    const ids = [
      '4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca',
      'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa',
    ];
    await client.getAssets(...ids);
    expect(global.fetch).toBeCalledWith(
      `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca&ids[]=AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa`
    );
  });

  it('fetch is called with correct params#2', async () => {
    const ids = ['4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'];
    await client.getAssets(...ids);
    expect(global.fetch).toBeCalledWith(
      `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca`
    );
  });

  it('fetch is called with correct params#3', async () => {
    const ids = [];
    await client.getAssets(...ids);

    expect(global.fetch).toBeCalledWith(`${NODE_URL}/assets?`);
  });

  it('throws, if called with wrong types', async () => {
    const wrongTypes = [1, null, NaN, undefined, {}];
    wrongTypes.map(
      async t => await expect(client.getAssets(t)).rejects.toBeDefined()
    );
  });
});

describe('Pairs endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    const pair1 = new AssetPair(
      'WAVES',
      '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
    );
    const pair2 = new AssetPair(
      'WAVES',
      '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu'
    );
    await client.getPairs(pair1, pair2);
    expect(global.fetch).toBeCalledWith(
      `${NODE_URL}/pairs?pairs[]=WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS&pairs[]=WAVES/474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu`
    );
  });

  it('fetch is called with correct params#2', async () => {
    const pairs = [];
    await client.getPairs(...pairs);

    expect(global.fetch).toBeCalledWith(`${NODE_URL}/pairs?`);
  });

  it('throws, if called with wrong types', async () => {
    const wrongTypes = [
      1,
      null,
      NaN,
      undefined,
      {},
      { amountAsset: '' },
      { priceAsset: '' },
      '',
    ];
    wrongTypes.map(
      async t => await expect(client.getPairs(t)).rejects.toBeDefined()
    );
  });
});
