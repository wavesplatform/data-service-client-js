import {
  TLibOptions,
  TAssetId,
  TListResponseJSON,
  TPairsResponseJSON,
  IPairJSON,
  TGetPairs,
  TCreateGetFn,
} from '../types';
import { BigNumber, AssetPair } from '@waves/data-entities';
import { some, notString, createQS } from '../utils';
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

const getPairs: TCreateGetFn<TGetPairs> = libOptions =>
  createMethod({
    validate: validatePairs,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default getPairs;
