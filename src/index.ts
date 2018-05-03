import { Asset, IAssetJSON } from '@waves/data-entities';
// @ts-ignore-next-line
import * as createParser from 'parse-json-bignumber';
const JSONBigParser = createParser();

import { some, fetchData, notString, pipeP, createQS } from './utils';

// Types
export type TLibOptions = {
  nodeUrl: string;
};
export type AssetId = string;

export type TAssetResponseJSON = {
  __type: 'asset';
  data: IAssetJSON;
};
export type TListResponseJSON<T> = {
  __type: 'list';
  data: T[];
};
export type TAssetsResponseJSON = TListResponseJSON<TAssetResponseJSON>;

export default class DataServiceClient {
  // Helpers
  private validateIds = (ids: string[]): Promise<AssetId[]> =>
    ids.some(notString)
      ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
      : Promise.resolve(ids);
  private createUrlForMany = (nodeUrl: string) => (ids: string[]): string =>
    `${nodeUrl}/assets?${createQS({ ids })}`;
  private mapToAssets = (res: TAssetsResponseJSON): Asset[] =>
    res.data.map(({ data }) => (data === null ? null : new Asset(data)));

  // Api
  public getAssets(...ids: AssetId[]): Promise<Asset[]> {
    return pipeP(
      this.validateIds,
      this.createUrlForMany(this.options.nodeUrl),
      fetchData(JSONBigParser),
      this.mapToAssets
    )(...ids);
  }

  constructor(private options: TLibOptions) {
    if (!options.nodeUrl)
      throw new Error(
        'No nodeUrl was presented in options object. Check constructor call.'
      );
  }
}
