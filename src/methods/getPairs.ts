import { TGetPairs, TCreateGetFn, LibOptions } from '../types';
import { AssetPair } from '@waves/data-entities';
import { createQS } from '../utils';
import { createMethod } from './createMethod';

const validatePairs = (
  pairOrPairs: AssetPair[] | AssetPair
): Promise<AssetPair[]> => {
  const arrayToCheck = Array.isArray(pairOrPairs) ? pairOrPairs : [pairOrPairs];
  return arrayToCheck.every(AssetPair.isAssetPair)
    ? Promise.resolve(arrayToCheck)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );
};

const createUrlForMany = (nodeUrl: string) => (pairs: AssetPair[]): string =>
  `${nodeUrl}/pairs${createQS({ pairs })}`;

const getPairs: TCreateGetFn<TGetPairs> = (libOptions: LibOptions) =>
  createMethod({
    validate: validatePairs,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default getPairs;
