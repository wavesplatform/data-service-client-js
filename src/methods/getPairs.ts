import { TGetPairs, TCreateGetFn, LibOptions, LibRequest } from '../types';
import { AssetPair } from '@waves/data-entities';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const isAssetPair = (pair: unknown) => {
  if (typeof pair === 'string') return pair.split('/').length === 2;
  else if (typeof pair === 'object' && pair !== null) return AssetPair.isAssetPair(pair);
  return false;
};

const validatePairs = (
  pairOrPairs: AssetPair[] | AssetPair
): Promise<AssetPair[]> => {
  const arrayToCheck = Array.isArray(pairOrPairs) ? pairOrPairs : [pairOrPairs];
  return arrayToCheck.every(isAssetPair)
    ? Promise.resolve(arrayToCheck)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );
};

const createRequestForMany = (nodeUrl: string) => (
  pairs: AssetPair[]
): LibRequest =>
  createRequest(`${nodeUrl}/pairs`, { pairs: pairs.map(p => p.toString()) });

const getPairs: TCreateGetFn<TGetPairs> = (libOptions: LibOptions) =>
  createMethod({
    validate: validatePairs,
    generateRequest: createRequestForMany,
    libOptions,
  });

export default getPairs;
