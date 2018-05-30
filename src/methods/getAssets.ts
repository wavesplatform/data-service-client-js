import { TAssetId, TAssetsResponseJSON, TLibOptions } from '../types';

import { some, notString, createQS, pipeP, fetchData } from '../utils';
import { createMethod } from './createMethod';

const validateIds = (ids: TAssetId[]): Promise<TAssetId[]> =>
  ids.some(notString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(ids);

const createUrlForMany = (rootUrl: string) => (ids: TAssetId[]): string =>
  `${rootUrl}/assets?${createQS({ ids })}`;

const getAssets = (libOptions: TLibOptions) =>
  createMethod({
    validate: validateIds,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default getAssets;
