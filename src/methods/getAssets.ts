import { TAssetId, TGetAssets, TCreateGetFn, LibOptions } from '../types';

import { isNotString, createQS } from '../utils';
import { createMethod } from './createMethod';

const validateIds = (idOrIds: TAssetId[] | TAssetId): Promise<TAssetId[]> => {
  const arrayToCheck = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
  return arrayToCheck.some(isNotString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(arrayToCheck);
};

const createUrlForMany = (rootUrl: string) => (ids: TAssetId[]): string =>
  `${rootUrl}/assets${createQS({ ids })}`;

const createGetAssets: TCreateGetFn<TGetAssets> = (libOptions: LibOptions) =>
  createMethod({
    validate: validateIds,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default createGetAssets;
