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
    typeof request[0] === 'string' &&
    (Array.isArray(request[1]) ? request[1] : [request[1]]).every(isAssetPair)
  );
};

const validateRequest = (matcher: any) => (
  pairs: any
): Promise<TPairsRequest> => {
  const request = [matcher, pairs];
  return isValidPairsFilters(request)
    ? Promise.resolve(request)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );
};

const createRequestForMany = (nodeUrl: string) => ([
  matcher,
  pairs,
]: TPairsRequest): ILibRequest =>
  createRequest(`${nodeUrl}/pairs`, {
    pairs: pairs.map(p => p.toString()),
    matcher,
  });

const getPairs: TCreateGetFn<TGetPairs> = (libOptions: ILibOptions) => (
  matcher: string
) =>
  createMethod<TPairJSON[]>({
    validate: validateRequest(matcher),
    generateRequest: createRequestForMany,
    libOptions,
  });

export default getPairs;
