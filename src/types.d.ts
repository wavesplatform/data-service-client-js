import { Asset, IAssetJSON, BigNumber, AssetPair } from '@waves/data-entities';

export type TListResponseJSON<T> = {
  __type: 'list';
  data: T[];
};

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
  __type: 'asset';
  data: IAssetJSON;
};

export type TAssetsResponseJSON = TListResponseJSON<TAssetResponseJSON>;

export type TGetPairsFn = (...pairs: AssetPair[]) => Promise<IPairJSON[]>;

export type IPairJSON = {
  firstPrice: BigNumber;
  lastPrice: BigNumber;
  volume: BigNumber;
  amountAsset: string;
  priceAsset: string;
};

export type TPairResponseJSON = {
  __type: 'pair';
  data: IPairJSON;
};
export type TPairsResponseJSON = TListResponseJSON<TPairResponseJSON>;
