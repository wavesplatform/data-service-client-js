import { Asset, IAssetJSON } from '@waves/data-entities';
import { TLibOptions, TAssetId, TListResponseJSON } from '../types';

import { some, notString, createQS, pipeP, fetchData } from '../utils';

type TGetAssetsFn = (...ids: TAssetId[]) => Promise<Asset[]>;

type TAssetResponseJSON = {
  __type: 'asset';
  data: IAssetJSON;
};

type TAssetsResponseJSON = TListResponseJSON<TAssetResponseJSON>;

const validateIds = (ids: TAssetId[]): Promise<TAssetId[]> =>
  ids.some(notString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(ids);

const createUrlForMany = (nodeUrl: string) => (ids: TAssetId[]): string =>
  `${nodeUrl}/assets?${createQS({ ids })}`;

const mapToAssets = (res: TAssetsResponseJSON): Asset[] =>
  res.data.map(({ data }) => (data === null ? null : new Asset(data)));

const getAssets = (options: TLibOptions): TGetAssetsFn =>
  pipeP(
    validateIds,
    createUrlForMany(options.nodeUrl),
    fetchData(options.parser),
    mapToAssets
  );

export default getAssets;
