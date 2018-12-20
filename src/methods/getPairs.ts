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

const isAssetPair = (pair: unknown): pair is AssetPair => {
  if (typeof pair === 'string')
    return pair.split('/').length === 2;
  else if (typeof pair === 'object' && pair !== null)
    return AssetPair.isAssetPair(pair);
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
