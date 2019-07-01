import {
  TCreateGetFn,
  TCandlesParams,
  LibOptions,
  LibRequest,
  TGetCandles,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

type CandlesRequestFilters = [string, string, TCandlesParams];

type TCandlesParamsKey = keyof TCandlesParams;

const possibleParams: Array<TCandlesParamsKey> = ['timeStart', 'timeEnd', 'interval', 'matcher'];  

const isCandlesParams = (params: any): params is TCandlesParams =>
  typeof params === 'object' &&
  Object.keys(params).every((k: TCandlesParamsKey) => possibleParams.includes(k));

const isFilters = (filters: any): filters is CandlesRequestFilters =>
  Array.isArray(filters) &&
  filters.length === 3 &&
  typeof filters[0] === 'string' &&
  typeof filters[1] === 'string' &&
  isCandlesParams(filters[2]);
  
const validateFilters = (filters: any) =>
  isFilters(filters)
    ? Promise.resolve(filters)
    : Promise.reject('Wrong filters object');

const createRequestForCandles = (rootUrl: string) => ([
  amountAssetId,
  priceAssetId,
  params,
]: CandlesRequestFilters): LibRequest =>
  createRequest(`${rootUrl}/candles/${amountAssetId}/${priceAssetId}`, params);

const createGetCandles: TCreateGetFn<TGetCandles> = (libOptions: LibOptions) =>
  createMethod({
    validate: validateFilters,
    generateRequest: createRequestForCandles,
    libOptions,
  });

export default createGetCandles;
