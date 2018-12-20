import {
  TGetPairs,
  TCreateGetFn,
  LibOptions,
  LibRequest,
  TPairsParams,
} from '../types';
import { AssetPair } from '@waves/data-entities';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const isAssetPair = (pairOrParams: unknown) => {
  if (typeof pairOrParams === 'string')
    return pairOrParams.split('/').length === 2;
  else if (typeof pairOrParams === 'object' && pairOrParams !== null)
    return AssetPair.isAssetPair(pairOrParams);
  return false;
};

const validatePairsAndParams = (
  pairOrPairs: AssetPair[] | AssetPair | TPairsParams
): Promise<AssetPair[] | TPairsParams> => {
  if (isPairsParams(pairOrPairs))
    return Promise.resolve(pairOrPairs);

  const arrayToCheck = Array.isArray(pairOrPairs) ? pairOrPairs : [pairOrPairs];
  return arrayToCheck.every(isAssetPair)
    ? Promise.resolve(arrayToCheck)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );
};

const isPairsParams = (data: unknown): data is TPairsParams =>
  typeof data === 'object' && data !== null && 'limit' in data;

const createRequestForMany = (nodeUrl: string) => (
  data: AssetPair[] | TPairsParams
): LibRequest => {
  const params = isPairsParams(data)
    ? { limit: data.limit }
    : { pairs: data.map(p => p.toString()) };
  return createRequest(`${nodeUrl}/pairs`, params);
};

const getPairs: TCreateGetFn<TGetPairs> = (libOptions: LibOptions) =>
  createMethod({
    validate: validatePairsAndParams,
    generateRequest: createRequestForMany,
    libOptions,
  });

export default getPairs;
