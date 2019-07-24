const parser = require('parse-json-bignumber')();
import DataServiceClient from '../index';
import { AssetPair, Asset } from '@waves/data-entities';

const fetch = jest.fn(() => Promise.resolve('{"data":[{ "data": 1 }]}'));
const NODE_URL = 'NODE_URL';
const MATCHER = '3PJjwFREg8F9V6Cp9fnUuEwRts6HQQa5nfP';
const client = new DataServiceClient({
  rootUrl: NODE_URL,
  parse: parser,
  fetch,
});

describe('Asssets endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    const ids = [
      '4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca',
      'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa',
    ];
    await client.getAssets(...ids);
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('fetch is called with correct params#2', async () => {
    const ids = ['4CYRBpSmNKqmw1PoKFoZADv5FaciyJcusqrHyPrAQ4Ca'];
    await client.getAssets(...ids);
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('fetch is called with correct params#3', async () => {
    const ids = [];
    await client.getAssets(...ids);

    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('fetch is called with correct params#4', async () => {
    const ticker = 'WAVES';
    await client.getAssetsByTicker(ticker);

    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('fetch is called with correct params#5', async () => {
    const ticker = '*';
    await client.getAssetsByTicker(ticker);

    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('throws, if called with wrong types', async () => {
    const wrongTypes: any[] = [1, null, NaN, undefined, {}];
    wrongTypes.map(
      async t => await expect(client.getAssets(t)).rejects.toBeDefined()
    );
  });
});

describe('Pairs endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    const pair1 = new AssetPair(
      'WAVES' as any,
      '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS' as any
    );
    const pair2 = new AssetPair(
      'WAVES' as any,
      '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu' as any
    );
    await client.getPairs('3PJjwFREg8F9V6Cp9fnUuEwRts6HQQa5nfP')([
      pair1,
      pair2,
    ]);
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('fetch is called with correct params#2', async () => {
    const pairs = [];
    await client.getPairs('3PJjwFREg8F9V6Cp9fnUuEwRts6HQQa5nfP')(pairs);

    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('throws, if called with wrong types', async () => {
    const wrongTypes: any = [
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
      async t =>
        await expect(
          client.getPairs('3PJjwFREg8F9V6Cp9fnUuEwRts6HQQa5nfP')(t)
        ).rejects.toBeDefined()
    );
  });
});

describe('Aliases endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    await client.aliases.getByAddress('address');
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
  it('fetch is called with correct params#1', async () => {
    await client.aliases.getByAddress('address', { showBroken: true });
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
  it('fetch is called with correct params#2', async () => {
    await client.aliases.getById('id');
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });

  it('throws, if called with wrong types', async () => {
    const wrongTypes: any = [1, null, NaN, undefined, {}];
    wrongTypes.map(async t => {
      await expect(client.aliases.getByAddress(t)).rejects.toBeDefined();
      await expect(client.aliases.getById(t)).rejects.toBeDefined();
    });
  });
});

describe('Candles endpoint: ', () => {
  it('fetch is called with correct params#1', async () => {
    await client.getCandles('AMOUNTASSETID', 'PRICEASSETID', {
      timeStart: '2018-12-01',
      timeEnd: '2018-12-31',
      interval: '1h',
      matcher: '123',
    });
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
  it('fetch is called with correct params#2', async () => {
    await client.getCandles('AMOUNTASSETID', 'PRICEASSETID', {
      timeStart: '2018-12-01',
      interval: '1h',
      matcher: '123',
    });
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
  it('throws, if called with wrong types', async () => {
    const wrongTypes: any = [null, NaN, {}];
    wrongTypes.map(async t => {
      await expect(client.getCandles(null, null, null)).rejects.toBeDefined();
      await expect(client.getCandles(null, null, t)).rejects.toBeDefined();
    });
  });
});

describe('ExchangeTxs endpoint: ', async () => {
  type Case = { label: string; params: any[]; expectedUrl?: string };
  const goodCases: Case[] = [
    {
      label: 'single string',
      params: ['8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'],
      expectedUrl: `${NODE_URL}/transactions/exchange/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS`,
    },
    {
      label: 'empty call',
      params: [],
      expectedUrl: `${NODE_URL}/transactions/exchange`,
    },
    {
      label: 'with one filter',
      params: [{ timeStart: '2016-01-01' }],
      expectedUrl: `${NODE_URL}/transactions/exchange?timeStart=2016-01-01`,
    },
    {
      label: 'with all filters',
      params: [
        {
          timeStart: '2016-02-01',
          timeEnd: '2016-03-01',
          matcher: 'matcher',
          sender: 'sender',
          amountAsset: 'asset1',
          priceAsset: 'priceAsset',
          limit: 5,
          sort: '-some',
        },
      ],
      expectedUrl: `${NODE_URL}/transactions/exchange?timeStart=2016-02-01&timeEnd=2016-03-01&matcher=matcher&sender=sender&amountAsset=asset1&priceAsset=priceAsset&limit=5&sort=-some`,
    },
  ];
  const badCases: Case[] = [
    {
      label: 'with wrong filters',
      params: [{ incorrectField: '' }],
    },
    {
      label: 'with number',
      params: [1],
    },
    {
      label: 'with null',
      params: [null],
    },
  ];

  goodCases.forEach((c, i) => {
    it(`works with (${c.label})`, async () => {
      const result = await client.getExchangeTxs(c.params[0]);
      expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
    });
  });
  badCases.forEach((c, i) => {
    it(`fails with (${c.label})`, async () => {
      await expect(client.getExchangeTxs(c.params[0])).rejects.toBeDefined();
    });
  });
});

describe('TransferTxs endpoint: ', async () => {
  type Case = { label: string; params: any[]; expectedUrl?: string };
  const goodCases: Case[] = [
    {
      label: 'single string',
      params: ['some id'],
    },
    {
      label: 'empty call',
      params: [],
    },
    {
      label: 'with one filter',
      params: [{ timeStart: '2016-01-01' }],
    },
    {
      label: 'with all filters',
      params: [
        {
          assetId: 'assetId',
          sender: 'sender',
          recipient: 'recipient',
          timeStart: '2016-02-01',
          timeEnd: '2016-03-01',
          limit: 5,
          sort: '-some',
        },
      ],
    },
  ];
  const badCases: Case[] = [
    {
      label: 'with wrong filters',
      params: [{ incorrectField: '' }],
    },
    {
      label: 'with number',
      params: [1],
    },
    {
      label: 'with null',
      params: [null],
    },
  ];

  goodCases.forEach((c, i) => {
    it(`works with (${c.label})`, async () => {
      const result = await client.getTransferTxs(c.params[0]);
      expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
    });
  });
  badCases.forEach((c, i) => {
    it(`fails with (${c.label})`, async () => {
      await expect(client.getTransferTxs(c.params[0])).rejects.toBeDefined();
    });
  });
});

describe('Pagination: ', () => {
  it('works', async () => {
    const customFetch = jest.fn(() =>
      Promise.resolve(
        '{"__type": "list","lastCursor": "cursor", "data": [{ "data": 1 }]}'
      )
    );
    const customClient = new DataServiceClient({
      rootUrl: NODE_URL,
      parse: parser,
      fetch: customFetch,
    });

    const result = await customClient.getAssets('test');
    expect(result).toHaveProperty('data');
    expect(result).not.toHaveProperty('fetchMore');

    const result2 = await customClient.getExchangeTxs({
      sort: 'asc',
      limit: 1,
    });
    expect(result2).toHaveProperty('data');
    expect(result2).toHaveProperty('fetchMore');
    const result3 = await result2.fetchMore(1);
    expect(result3).toHaveProperty('data');
    expect(result3).toHaveProperty('fetchMore');
    expect(customFetch.mock.calls.slice(-2)).toMatchSnapshot();
  });
});

describe('Custom transformer: ', () => {
  const fetchMocks = {
    assets: JSON.stringify({
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
    }),
    pairs: JSON.stringify({
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
    }),
    candles: JSON.stringify({
      __type: 'list',
      data: [
        {
          __type: 'candle',
          data: {},
        },
        {
          __type: 'candle',
          data: {},
        },
        {
          __type: 'candle',
          data: {},
        },
      ],
    }),
  };
  const customFetchMock = type =>
    jest.fn(() => Promise.resolve(fetchMocks[type]));

  it('works for list of assets', async () => {
    const transformMocks = {
      list: jest.fn(d => d.map(customTransformer)),
      asset: jest.fn(),
      pair: jest.fn(),
    };

    const customTransformer = ({ __type, data, ...etc }) =>
      transformMocks[__type](data);

    const customClient = new DataServiceClient({
      rootUrl: NODE_URL,
      parse: parser,
      fetch: customFetchMock('assets'),
      transform: customTransformer,
    });
    const assets = await customClient.getAssets('1', '2');
    expect(transformMocks.list).toHaveBeenCalledTimes(1);
    expect(transformMocks.asset).toHaveBeenCalledTimes(2);
    expect(transformMocks.pair).toHaveBeenCalledTimes(0);
  });

  it('works for list of candles', async () => {
    const transformMocks = {
      list: jest.fn(d => d.map(customTransformer)),
      pair: jest.fn(),
      candle: jest.fn(),
    };

    const customTransformer = ({ __type, data, ...etc }) =>
      transformMocks[__type](data);

    const customClient = new DataServiceClient({
      rootUrl: NODE_URL,
      parse: parser,
      fetch: customFetchMock('candles'),
      transform: customTransformer,
    });

    const candles = await customClient.getCandles('WAVES', 'BTC', {
      timeStart: new Date(),
      interval: '1d',
      matcher: 'matcher',
    });
    expect(transformMocks.list).toHaveBeenCalledTimes(1);
    expect(transformMocks.candle).toHaveBeenCalledTimes(3);
    expect(transformMocks.pair).toHaveBeenCalledTimes(0);
  });
});

describe('Long params transforms into POST request', () => {
  it('works', async () => {
    const ids = new Array(300)
      .fill(1)
      .map(() => 'AENTt5heWujAzcw7PmGXi1ekRc7CAmNm87Q1xZMYXGLa');
    await client.getAssets(...ids);
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
  it('works for pairs', async () => {
    const pairs = new Array(300).fill(1).map(
      () =>
        new AssetPair(
          new Asset({ id: 'WAVES' } as any),
          new Asset({
            id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
          } as any)
        )
    );
    await client.getPairs('3PJjwFREg8F9V6Cp9fnUuEwRts6HQQa5nfP')(pairs);
    expect(fetch.mock.calls.slice().pop()).toMatchSnapshot();
  });
});
