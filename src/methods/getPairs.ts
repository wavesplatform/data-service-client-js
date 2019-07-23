import {
  TCreateGetFn,
  ILibOptions,
  ILibRequest,
  TGetPairs,
  TPairsRequest,
  TPairJSON,
} from '../types';
import { AssetPair } from '@waves/data-entities';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const isAssetPair = pair => {
  switch (true) {
    case typeof pair === 'string':
      return pair.split('/').length === 2;
    case typeof pair === 'object':
      return AssetPair.isAssetPair(pair);
    default:
      return false;
  }
};

const isValidPairsFilters = (request: any): request is TPairsRequest => {
  return (
    Array.isArray(request) &&
    request.length === 2 &&
    (Array.isArray(request[0]) ? request[0] : [request[0]]).every(
      isAssetPair
    ) &&
    typeof request[1] === 'string'
  );
};

const validateRequest = (request: any): Promise<TPairsRequest> => {
  return isValidPairsFilters(request)
    ? Promise.resolve(request)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );
};

const createRequestForMany = (nodeUrl: string) => ([
  pairs,
  matcher,
]: TPairsRequest): ILibRequest =>
  createRequest(`${nodeUrl}/pairs`, {
    pairs: pairs.map(p => p.toString()),
    matcher,
  });

const getPairs: TCreateGetFn<TGetPairs> = (libOptions: ILibOptions) =>
  createMethod<TPairJSON[]>({
    validate: validateRequest,
    generateRequest: createRequestForMany,
    libOptions,
  });

export default getPairs;
