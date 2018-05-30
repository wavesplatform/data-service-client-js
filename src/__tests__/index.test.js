const parser = require('parse-json-bignumber')();
const DataServiceClient = require('../index.ts').default;
const { AssetPair } = require('@waves/data-entities');
const fetch = jest.fn(() => Promise.resolve('{"data":[{ "data": 1 }]}'));
const NODE_URL = 'NODE_URL';
const client = new DataServiceClient({ rootUrl: NODE_URL, parser, fetch });

describe('Asssets endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    const ids = [
      '4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca',
      'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa',
    ];
    await client.getAssets(...ids);
    expect(fetch).toBeCalledWith(
      `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca&ids[]=AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa`
    );
  });

  it('fetch is called with correct params#2', async () => {
    const ids = ['4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'];
    await client.getAssets(...ids);
    expect(fetch).toBeCalledWith(
      `${NODE_URL}/assets?ids[]=4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca`
    );
  });

  it('fetch is called with correct params#3', async () => {
    const ids = [];
    await client.getAssets(...ids);

    expect(fetch).toBeCalledWith(`${NODE_URL}/assets?`);
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
    expect(fetch).toBeCalledWith(
      `${NODE_URL}/pairs?pairs[]=WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS&pairs[]=WAVES/474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu`
    );
  });

  it('fetch is called with correct params#2', async () => {
    const pairs = [];
    await client.getPairs(...pairs);

    expect(fetch).toBeCalledWith(`${NODE_URL}/pairs?`);
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

describe('Custom transformer: ', () => {
  const fetchMocks = {
    assets: {
      __type: 'list',
      data: [
        {
          __type: 'asset',
          data: {},
        },
        {
          __type: 'asset',
          data: {},
        },
      ],
    },
    pairs: {
      __type: 'list',
      data: [
        {
          __type: 'pair',
          data: {},
        },
        {
          __type: 'pair',
          data: {},
        },
      ],
    },
  };
  const customFetchMock = type =>
    jest.fn(() => Promise.resolve(fetchMocks[type]));

  const transformMocks = {
    list: jest.fn(d => d.map(customTransformer)),
    asset: jest.fn(),
    pair: jest.fn(),
  };
  const customTransformer = ({ __type, data, ...etc }) =>
    transformMocks[__type](data);

  it('works for list of assets', async () => {
    const customClient = new DataServiceClient({
      rootUrl: NODE_URL,
      parser,
      fetch: customFetchMock('assets'),
      transform: customTransformer,
    });
    const assets = await customClient.getAssets('1', '2');
    expect(transformMocks.list.mock.calls).toHaveLength(1);
    expect(transformMocks.asset.mock.calls).toHaveLength(2);
    expect(transformMocks.pair.mock.calls).toHaveLength(0);
  });
});
