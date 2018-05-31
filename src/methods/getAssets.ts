import {
  TAssetId,
  TAssetsResponseJSON,
  TLibOptions,
  TGetAssets,
  TCreateGetFn,
} from '../types';

import { some, isNotString, createQS, pipeP, fetchData } from '../utils';
import { createMethod } from './createMethod';

const validateIds = (idOrIds: TAssetId[] | TAssetId): Promise<TAssetId[]> => {
  const arrayToCheck = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
  return arrayToCheck.some(isNotString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(arrayToCheck);
};

const createUrlForMany = (rootUrl: string) => (ids: TAssetId[]): string =>
  `${rootUrl}/assets${createQS({ ids })}`;

const createGetAssets: TCreateGetFn<TGetAssets> = libOptions =>
  createMethod({
    validate: validateIds,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default createGetAssets;
