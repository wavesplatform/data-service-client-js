import { Asset, IAssetJSON } from '@waves/data-entities';
// @ts-ignore-next-line
import * as createParser from 'parse-json-bignumber';
const JSONBigParser = createParser();

import { some, fetchData, notString, pipeM } from './utils';

export type TLibOptions = {
  nodeUrl: string;
};
export type AssetId = string;

export default class DataServiceClient {
  public getAssets: (...ids: AssetId[]) => Promise<Asset[]>;

  constructor(options: TLibOptions) {
    if (!options.nodeUrl)
      throw new Error(
        'No nodeUrl was presented in options object. Check constructor call.'
      );
    this.getAssets = createGetAssets(options.nodeUrl);
  }
}
const validateIds = async (ids: string[]) =>
  ids.some(notString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(ids);

const createQSForMany = (ids: string[]) =>
  ids.map((id: string) => `ids[]=${encodeURIComponent(id)}`).join('&');
const createUrlForMany = (nodeUrl: string) => (ids: string[]) =>
  `${nodeUrl}/assets?${createQSForMany(ids)}`;

const mapToAssets = (res: { __type: string; data: ({ data: IAssetJSON })[] }) =>
  res.data.map(({ data }) => new Asset(data));

const createGetAssets = (nodeUrl: string) => async (
  ...ids: AssetId[]
): Promise<Asset[]> =>
  pipeM(
    validateIds,
    createUrlForMany(nodeUrl),
    fetchData(JSONBigParser),
    mapToAssets
  )(...ids);
