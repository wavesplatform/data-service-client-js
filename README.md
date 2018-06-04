# JS Library for Waves data services

## Usage

```typescript
const DataServiceClient = require('@waves/data-service-client-js').default;

// Initialization
const client = new DataServiceClient({
  rootUrl: 'http://api.wavesplatform.com/v0',
  fetch: window.fetch, // or fetch shim for nodejs
  parse: res => res.json(),
});

// Fetching
(async () => {
  await client.getAssets('WAVES'); // Asset {}
})();
```

## Methods

- getAssets:

```typescript
await client.getAssets('WAVES'); // One
await client.getAssets('WAVES', '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'); // Or many

type getAssets = (...ids: TAssetId[]) => Promise<Asset[]>;
```

- getPairs

```typescript
await client.getPairs('WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'); // One
await client.getPairs('WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS', 'WAVES/474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu'); // Many

type getPairs = (...pairs: AssetPair[]) => Promise<IPairJSON[]>;
type AssetPair =  AssetPair from data-entities | 'assetId1/assetId2';
```

- getExchangeTxs:

```typescript
await client.getExchangeTxs('8rEwYY4wQ4bkEkk95EiyeQnvnonX6TAnU6eiBAbVSADk'); // By id
await client.getExchangeTxs({
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  matcher?: string;
  sender?: string;
  amountAsset?: string | Asset;
  priceAsset?: string | Asset;
  limit?: number;
  sort?: string; // not working before pagination
}); // With filters
await client.getExchangeTxs(); // Top 100 with default filters (timeStart = day ago, timeEnd = now)

interface getExchangeTxs {
  (filters: TransactionFilters): Promise<Transaction[]>;
  (id: string): Promise<Transaction>;
  (): Promise<Transaction[]>;
}
```

## Custom init params

One can set custom fetcher, parser and transformer for library.

```typescript
type TLibOptions = {
  rootUrl: string;
  fetch?: TFunction;
  parse?: TParser;
  transform?: TFunction;
};
```

The path is fetch -> parse -> transform

Parse can be `res => res.text()` for fetch, or `json-bigint`'s parse if you want to add support for bignumbers.

Transform function has next signature by default (it depends on your parse function):
`({ \_\_type, data, ...rest }) => any`

Basically you can switch on \_\_type and do transformations.
