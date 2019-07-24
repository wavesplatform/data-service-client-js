# JS Library for Waves data services

## Usage

```typescript
const DataServiceClient = require('@waves/data-service-client-js').default;

// Initialization
const client = new DataServiceClient({
  rootUrl: 'http://api.wavesplatform.com/v0',
  fetch: req => window.fetch(req).then(res => res.text()), // fetch must return string
  parse: str => JSON.parse(str),
});

// Fetching
(async () => {
  const { data } = await client.getAssets('WAVES'); // data: Asset {}
})();
```

## Methods

### Response format

`{ data, ...meta }`

### All methods do GET requests, until query is under 2k symbols, then automatically switch to POST

- getAssets:

```typescript
await client.getAssets('WAVES'); // One { data: Asset }
await client.getAssets('WAVES', '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'); // Or many { data: Asset[] }
await client.getAssetsByTicker('WAVES');  // Many { data: Asset[] }
await client.getAssetsByTicker('*');  // Many { data: Asset[] } - all assets
```

- getPairs

```typescript
const getPairs = client.getPairs('MATCHER_ID'); // set up DEX matcher
await getPairs([
  'WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
  'WAVES/474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu'
]); // get pairs
```

- getExchangeTxs:

```typescript
await client.getExchangeTxs('8rEwYY4wQ4bkEkk95EiyeQnvnonX6TAnU6eiBAbVSADk'); // By id { data: Tx }
await client.getExchangeTxs({
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  matcher?: string;
  sender?: string;
  amountAsset?: string | Asset;
  priceAsset?: string | Asset;
  limit?: number;
  sort?: 'asc'|'desc';
}); // With filters { data: Tx[] }
await client.getExchangeTxs(); // Top 100 with default filters (timeStart = timestamp of first entry in db, timeEnd = now)
```

- aliases:

```typescript
const alias1 = await client.aliases.getById('@askerych');
/*
  { data: {
      address: '3P5uMgn1xvrm7g3sbUVAGLtetkNUa1AHn2M',
      alias: '@askerych'
    }
  }
  */
const alias2 = await client.aliases.getByAddress(
  '3P5uMgn1xvrm7g3sbUVAGLtetkNUa1AHn2M'
);
/*
  { data: [{
      address: '3P5uMgn1xvrm7g3sbUVAGLtetkNUa1AHn2M',
      alias: '@askerych'
    }]
  }
  */
```

- getCandles:

```typescript
await client.getCandles(amountAsset: string, priceAsset: string, {
  timeStart: string | Date | number;
  timeEnd?: string | Date | number;
  interval: string; // interval pattern is xy, where x - number, y - one of m (minutes), h (hours), d (days), M (Month)
});
await client.getCandles('WAVES', '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS', {
  timeStart: '2018-12-01',
  timeEnd: '2018-12-31',
  interval: '1d'
});
```

## Pagination

```typescript
type Response<T> = {
  data: T;
  fetchMore?: TFunction;
};
const response1 = await client.getExchangeTxs({ limit: 1, sort: 'asc' });
const data1 = response1.data;
// Process data

const response2 = await res1.fetchMore(2); // 2 more
```

## Custom init params

You can set custom fetcher, parser and transformer for library.

```typescript
type TLibOptions = {
  rootUrl: string;
  fetch?: TFunction;
  parse?: TParser;
  transform?: TFunction;
};
```

The path is fetch -> parse -> transform

### Fetch must return string!

Fetch accepts (url, options)
Fetch by default is `fetch(...).then(res => res.text())`

Parse by default is `JSON.parse.bind(JSON)` , you can use `json-bigint`'s parse if you want to add support for bignumbers.

Transform function has next signature by default (it depends on your parse function):

```
({
  __type,
  data,
  ...rest
}) => any
```

Basically you can switch on \_\_type and do transformations.
