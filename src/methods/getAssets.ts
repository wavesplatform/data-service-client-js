import {
  TAssetId,
  TGetAssets,
  TCreateGetFn,
  LibOptions,
  LibRequest,
} from '../types';

import { isNotString } from '../utils';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const validateIds = (idOrIds: TAssetId[] | TAssetId): Promise<TAssetId[]> => {
  const arrayToCheck = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
  return arrayToCheck.some(isNotString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(arrayToCheck);
};

const createRequestForMany = (rootUrl: string) => (
  ids: TAssetId[]
): LibRequest => createRequest(`${rootUrl}/assets`, { ids });

const createGetAssets: TCreateGetFn<TGetAssets> = (libOptions: LibOptions) =>
  createMethod({
    validate: validateIds,
    generateRequest: createRequestForMany,
    libOptions,
  });

export default createGetAssets;
