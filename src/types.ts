import { Asset, IAssetJSON, BigNumber, AssetPair } from '@waves/data-entities';
import { api } from '@waves/ts-types';

import { AliasesByAddressOptions } from './methods/getAliases';

export type TCandleBase<T> = {
  time: Date;
  open: T;
  close: T;
  high: T;
  low: T;
  volume: T;
  quoteVolume: T;
  weightedAveragePrice: T;
  maxHeight: number;
  txsCoung: number;
};

export type PairBase = {
  firstPrice: BigNumber;
  lastPrice: BigNumber;
  volume: BigNumber;
  amountAsset: string;
  priceAsset: string;
};

export type TApiResponseBase<T, D> = {
  __type: T;
  data: D;
  [key: string]: any;
};
export type TApiListResponseBase<T> = TApiResponseBase<ApiTypes.List, T[]>;
export type TApiAssetResponse = TApiResponseBase<ApiTypes.Asset, IAssetJSON>;
export type TApiAliasResponse = TApiResponseBase<ApiTypes.Alias, Alias>;
export type TApiPairResponse = TApiResponseBase<ApiTypes.Pair, PairBase>;
export type TApiTransactionResponse = TApiResponseBase<
  ApiTypes.Transaction,
  ExchangeTransactionJSON | TransferTransaction | MassTransferTransaction
>;
export type TApiCandleResponse = TApiResponseBase<
  ApiTypes.Candle,
  TCandleBase<string | number>
>;

export type TApiElement =
  | TApiCandleResponse
  | TApiAssetResponse
  | TApiPairResponse
  | TApiTransactionResponse
  | TApiAliasResponse
  | null;
export type TApiResponse =
  | TApiListResponseBase<TApiElement>
  | TApiAssetResponse
  | TApiAliasResponse
  | TApiPairResponse
  | TApiTransactionResponse;

export type TransformationResult =
  | Asset
  | Alias
  | PairBase
  | ExchangeTransaction | TransferTransaction | MassTransferTransaction
  | TCandleBase<BigNumber | null>
  | null;

export type TCandlesParams = {
  timeStart: string | Date | number;
  timeEnd?: string | Date | number;
  interval: string;
};
export type TGetCandles = (
  amountAsset: string,
  priceAsset: string,
  params: TCandlesParams
) => TApiListResponseBase<TApiCandleResponse>;

export enum ApiTypes {
  List = 'list',
  Asset = 'asset',
  Pair = 'pair',
  Transaction = 'transaction',
  Alias = 'alias',
  Candle = 'candle',
}

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
}

export interface LibRequest {
  url: string;
  method: HttpMethods;
  headers?: {};
  body?: {};
}

export interface ExchangeTransaction extends api.IExchangeTransaction<BigNumber> {}
export interface ExchangeTransactionJSON extends api.IExchangeTransaction<number | string> {}

export interface TransferTransaction extends api.ITransferTransaction<BigNumber> {}
export interface TransferTransactionJSON extends api.ITransferTransaction<number | string> {}

export interface MassTransferTransaction extends api.IMassTransferTransaction<BigNumber> {}
export interface MassTransferTransactionJSON extends api.IMassTransferTransaction<number | string> {}

export interface ExchangeTxFilters {
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  matcher?: string;
  sender?: string;
  amountAsset?: string | Asset;
  priceAsset?: string | Asset;
  limit?: number;
  sort?: string;
}

export interface TransferTxFilters {
  sender?: string;
  recipient?: string;
  assetId?: string;
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  limit?: number;
  sort?: string;
}

export interface MassTransferTxFilters {
  sender?: string;
  recipient?: string;
  assetId?: string;
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  limit?: number;
  sort?: string;
}

export interface GetExchangeTxs {
  (filters: ExchangeTxFilters): Response<ExchangeTransactionJSON[]>;
  (id: string): Response<ExchangeTransactionJSON>;
  (): Response<ExchangeTransactionJSON[]>;
}
export interface GetTransferTxs {
  (filters: TransferTxFilters): Response<TransferTransactionJSON[]>;
  (id: string): Response<TransferTransactionJSON>;
  (): Response<TransferTransactionJSON[]>;
}
export interface GetMassTransferTxs {
  (filters: MassTransferTxFilters): Response<MassTransferTransaction[]>;
  (id: string): Response<MassTransferTransaction>;
  (): Response<MassTransferTransaction[]>;
}
export type Response<T> = Promise<{
  data: T;
  fetchMore?: TFunction;
}>;
export type TGetAssets = (...ids: TAssetId[]) => Response<Asset[]>;
export type TGetAssetsByTicker = (ticker: string) => Response<Asset[]>;
export type getAliasById = (id: AliasId) => Response<Alias>;
export type getAliasesByAddress = (
  address: string,
  options?: AliasesByAddressOptions
) => Response<Alias[]>;
export type TCreateGetFn<T> = (libOptions: LibOptions) => T;
export type TPredicate = (...args: any[]) => boolean;
export type TFunction = (...args: any[]) => any;
export type TParser = (text: string) => any;
export type aliases = {
  getById: getAliasById;
  getByAddress: getAliasesByAddress;
};
export interface LibOptions {
  rootUrl: string;
  parse?: TParser;
  fetch: TFunction;
  transform?: TFunction;
}
export interface PaginationOptions {
  method: TFunction;
  rawData: {
    lastCursor: string;
  };
  args: any;
  addPaginationToArgs: TFunction | undefined;
}
export type TAssetId = string;
export type AliasId = string;
export type Alias = {
  address: string;
  alias: string;
};
export type TGetAssetsFn = (...ids: TAssetId[]) => Response<Asset[]>;
export type TGetPairs = (...pairs: AssetPair[]) => Response<PairBase[]>;
