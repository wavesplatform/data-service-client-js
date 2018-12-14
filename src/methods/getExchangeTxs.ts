import {
  TCreateGetFn,
  ExchangeTxFilters,
  GetExchangeTxs,
  LibRequest,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

// One
const validateId = (id: string): Promise<string> =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateRequestOne = (rootUrl: string) => (id: string): LibRequest =>
  createRequest(`${rootUrl}/transactions/exchange/${id}`);

//Many
const isFilters = (filters: any): filters is ExchangeTxFilters => {
  const possibleFilters = [
    'timeStart',
    'timeEnd',
    'limit',
    'sort',
    'matcher',
    'sender',
    'amountAsset',
    'priceAsset',
    'after',
  ];
  return (
    typeof filters === 'object' &&
    Object.keys(filters).every(k => possibleFilters.includes(k))
  );
};
const validateFilters = (filters: any) =>
  isFilters(filters)
    ? Promise.resolve(filters)
    : Promise.reject('Wrong filters object');

const generateRequestMany = (rootUrl: string) => (
  filters: ExchangeTxFilters
): LibRequest => createRequest(`${rootUrl}/transactions/exchange`, filters);

const createGetExchangeTxs: TCreateGetFn<GetExchangeTxs> = libOptions => {
  const getExchangeTxsOne = createMethod({
    validate: validateId,
    generateRequest: generateRequestOne,
    libOptions,
  });
  const getExchangeTxsMany = createMethod({
    validate: validateFilters,
    generateRequest: generateRequestMany,
    libOptions,
    addPaginationToArgs: ({ args: [filters], cursor, count }) => ({
      ...filters,
      after: cursor,
      ...(count ? { limit: count } : {}),
    }),
  });

  const getExchangeTxs: GetExchangeTxs = (
    idOrFilters: string | ExchangeTxFilters = {}
  ) =>
    typeof idOrFilters === 'string'
      ? getExchangeTxsOne(idOrFilters)
      : getExchangeTxsMany(idOrFilters);

  return getExchangeTxs;
};

export default createGetExchangeTxs;
