import { Asset, IAssetJSON, BigNumber, AssetPair } from '@waves/data-entities';
export { Asset };
export type TListResponseJSON<T> = {
  __type: ApiTypes.List;
  data: T[];
};
export enum ApiTypes {
  List = 'list',
  Asset = 'asset',
  Pair = 'pair',
  Transaction = 'transaction',
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
  (filters: TransactionFilters): Promise<Transaction[]>;
  (id: string): Promise<Transaction>;
  (): Promise<Transaction[]>;
}
export type TGetAssets = (...ids: TAssetId[]) => Promise<Asset[]>;
export type TCreateGetFn<T> = (libOptions: TLibOptions) => T;
export type TPredicate = (...args: any[]) => boolean;
export type TFunction = (...args: any[]) => any;
export type TParser = (text: string) => any;

export type TLibOptions = {
  rootUrl: string;
  parse?: TParser;
  fetch?: TFunction;
  transform?: TFunction;
};
export type TAssetId = string;

export type TGetAssetsFn = (...ids: TAssetId[]) => Promise<Asset[]>;

export type TAssetResponseJSON = {
  __type: ApiTypes.Asset;
  data: IAssetJSON;
};

export type TAssetsResponseJSON = TListResponseJSON<TAssetResponseJSON>;

export type TGetPairs = (...pairs: AssetPair[]) => Promise<IPairJSON[]>;

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
