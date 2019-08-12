import { Asset } from '@waves/data-entities';
import {
  TCreateGetFn,
  ILibOptions,
  ILibRequest,
  TGetAssetsByTicker,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const validateTicker = (ticker: string): Promise<string> => {
  return typeof ticker !== 'string'
    ? Promise.reject(new Error('ArgumentsError: Ticker should be string'))
    : Promise.resolve(ticker);
};

const createRequestForMany = (rootUrl: string) => (
  ticker: string
): ILibRequest => createRequest(`${rootUrl}/assets`, { ticker });

const createGetAssetsByTicker: TCreateGetFn<TGetAssetsByTicker> = (
  libOptions: ILibOptions
) =>
  createMethod<Asset[]>({
    validate: validateTicker,
    generateRequest: createRequestForMany,
    libOptions,
  });

export default createGetAssetsByTicker;
