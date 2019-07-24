import { Asset, Candle, AssetPair } from '@waves/data-entities';
import { BigNumber } from '@waves/bignumber';

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
export interface ILibRequest {
  url: string;
  method: HttpMethods;
  headers?: {};
  body?: {};
}
export interface ILibOptions {
  rootUrl: string;
  parse?: TParser;
  fetch?: TFunction<any>;
  transform?: TFunction<any>;
}

export type TListResponseJSON<T> = {
  __type: ApiTypes.List;
  data: T[];
};
export type TResponse<T> = Promise<{
  data: T;
  fetchMore?: TFunction<TResponse<T>>;
}>;
export type TCreateGetFn<T> = (libOptions: ILibOptions) => T;
export type TPredicate = (...args: any[]) => boolean;
export type TFunction<T> = (...args: any[]) => T;
export type TParser = (text: string) => any;

export interface ITransaction {
  // @TODO add txs interfaces
}
export interface IExchangeTxFilters {
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  matcher?: string;
  sender?: string;
  amountAsset?: string | Asset;
  priceAsset?: string | Asset;
  limit?: number;
  sort?: string;
}
export interface ITransferTxFilters {
  sender?: string;
  recipient?: string;
  assetId?: string;
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  limit?: number;
  sort?: string;
}

export interface IMassTransferTxFilters {
  sender?: string;
  recipient?: string;
  assetId?: string;
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  limit?: number;
  sort?: string;
}

export interface IGetExchangeTxs {
  (filters: IExchangeTxFilters): TResponse<ITransaction[]>;
  (id: string): TResponse<ITransaction>;
  (): TResponse<ITransaction[]>;
}
export interface IGetTransferTxs {
  (filters: ITransferTxFilters): TResponse<ITransaction[]>;
  (id: string): TResponse<ITransaction>;
  (): TResponse<ITransaction[]>;
}
export interface IGetMassTransferTxs {
  (filters: IMassTransferTxFilters): TResponse<ITransaction[]>;
  (id: string): TResponse<ITransaction>;
  (): TResponse<ITransaction[]>;
}

export type TAssetId = string;
export type TGetAssets = (...ids: TAssetId[]) => TResponse<Asset[]>;
export type TGetAssetsByTicker = (ticker: string) => TResponse<Asset[]>;

export type TAliasId = string;
export type TAlias = {
  address: string;
  alias: string;
};
export type TAliasesByAddressOptions = { showBroken?: boolean };
export type TAliasesByAddressParams = [string, TAliasesByAddressOptions];
export type TAliases = {
  getById: TGetAliasById;
  getByAddress: TGetAliasesByAddress;
};
export type TGetAliasById = (id: TAliasId) => TResponse<TAlias[]>;
export type TGetAliasesByAddress = (
  address: string,
  options?: TAliasesByAddressOptions
) => TResponse<TAlias[]>;

export type TCandlesParams = {
  timeStart: string | Date | number;
  timeEnd?: string | Date | number;
  interval: string;
  matcher: string;
};
export type TCandlesRequestFilters = [string, string, TCandlesParams];
export type TGetCandles = (
  amountAsset: string,
  priceAsset: string,
  params: TCandlesParams
) => TResponse<Candle[]>;

export type TPairsRequest = [string, AssetPair[]];
export type TPairJSON = {
  firstPrice: BigNumber;
  lastPrice: BigNumber;
  volume: BigNumber;
  amountAsset: string;
  priceAsset: string;
};
export type TGetPairs = (
  matcher: string
) => (pairs: AssetPair[]) => TResponse<TPairJSON[]>;
