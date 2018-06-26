import { Asset, IAssetJSON, BigNumber, AssetPair } from '@waves/data-entities';

export type TListResponseJSON<T> = {
  __type: ApiTypes.List;
  data: T[];
};
export enum ApiTypes {
  List = 'list',
  Asset = 'asset',
  Pair = 'pair',
  Transaction = 'transaction',
  Alias = 'alias',
}

export interface Transaction {
  // @TODO add txs interfaces
}
export interface TransactionFilters {
  timeStart?: string | Date | number;
  timeEnd?: string | Date | number;
  matcher?: string;
  sender?: string;
  amountAsset?: string | Asset;
  priceAsset?: string | Asset;
  limit?: number;
  sort?: string;
}
export interface IGetExchangeTxs {
  (filters: TransactionFilters): Response<Transaction[]>;
  (id: string): Response<Transaction>;
  (): Response<Transaction[]>;
}
export type Response<T> = Promise<{
  data: T;
  fetchMore?: TFunction;
}>;
export type TGetAssets = (...ids: TAssetId[]) => Response<Asset[]>;
export type getAliasById = (id: AliasId) => Response<Alias>;
export type getAliasesByAddress = (address: string) => Response<Alias[]>;
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
  fetch?: TFunction;
  transform?: TFunction;
}
export type TAssetId = string;
export type AliasId = string;
export type Alias = {
  address: string;
  alias: string;
};
export type TGetAssetsFn = (...ids: TAssetId[]) => Response<Asset[]>;

export type TAssetResponseJSON = {
  __type: ApiTypes.Asset;
  data: IAssetJSON;
};

export type TAssetsResponseJSON = TListResponseJSON<TAssetResponseJSON>;

export type TGetPairs = (...pairs: AssetPair[]) => Response<IPairJSON[]>;

export type IPairJSON = {
  firstPrice: BigNumber;
  lastPrice: BigNumber;
  volume: BigNumber;
  amountAsset: string;
  priceAsset: string;
};

export type TPairResponseJSON = {
  __type: ApiTypes.Pair;
  data: IPairJSON;
};
export type TPairsResponseJSON = TListResponseJSON<TPairResponseJSON>;
