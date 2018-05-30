import {
  TLibOptions,
  TAssetId,
  TListResponseJSON,
  TPairsResponseJSON,
  IPairJSON,
  TGetPairsFn,
} from '../types';
import { BigNumber, AssetPair } from '@waves/data-entities';
import { some, notString, createQS } from '../utils';
import { createMethod } from './createMethod';

const validatePairs = (pairs: AssetPair[]): Promise<AssetPair[]> =>
  pairs.every(AssetPair.isAssetPair)
    ? Promise.resolve(pairs)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );

const createUrlForMany = (nodeUrl: string) => (pairs: AssetPair[]): string =>
  `${nodeUrl}/pairs${createQS({ pairs })}`;

const getPairs = (libOptions: TLibOptions): TGetPairsFn =>
  createMethod({
    validate: validatePairs,
    generateUrl: createUrlForMany,
    libOptions,
  });

export default getPairs;
