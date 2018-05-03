import { Asset, IAssetJSON } from '@waves/data-entities';
// @ts-ignore-next-line
import * as createParser from 'parse-json-bignumber';
const JSONBigParser = createParser();

import { some, fetchData, notString, pipeM } from './utils';

// Types
export type TLibOptions = {
  nodeUrl: string;
};
export type AssetId = string;
export type TAssetResponseJSON = {
  __type: string;
  data: IAssetJSON;
};
export interface IAssetsResponseJSON {
  data: TAssetResponseJSON[];
  __type: string;
}

// Helpers
const validateIds = async (ids: string[]): Promise<Error | string[]> =>
  ids.some(notString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(ids);

const createQSForMany = (ids: string[]): string =>
  ids.map((id: string) => `ids[]=${encodeURIComponent(id)}`).join('&');

const createUrlForMany = (nodeUrl: string) => (ids: string[]): string =>
  `${nodeUrl}/assets?${createQSForMany(ids)}`;

const mapToAssets = (res: IAssetsResponseJSON): Asset[] =>
  res.data.map(({ data }) => new Asset(data));

export default class DataServiceClient {
  private options: TLibOptions;
  public async getAssets(...ids: AssetId[]): Promise<IAssetsResponseJSON> {
    return pipeM(
      validateIds,
      createUrlForMany(this.options.nodeUrl),
      fetchData(JSONBigParser),
      mapToAssets
    )(...ids);
  }

  constructor(options: TLibOptions) {
    if (!options.nodeUrl)
      throw new Error(
        'No nodeUrl was presented in options object. Check constructor call.'
      );

    this.options = options;
  }
}
