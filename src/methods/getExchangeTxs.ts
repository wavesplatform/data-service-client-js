import {
  ILibRequest,
  TCreateGetFn,
  ITransaction,
  IExchangeTxFilters,
  IGetExchangeTxs,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

// One
const validateId = id =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateRequestOne = (rootUrl: string) => (id: string): ILibRequest =>
  createRequest(`${rootUrl}/transactions/exchange/${id}`);

//Many
const isFilters = (filters: any): filters is IExchangeTxFilters => {
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
  filters: IExchangeTxFilters
): ILibRequest => createRequest(`${rootUrl}/transactions/exchange`, filters);

const createGetExchangeTxs: TCreateGetFn<IGetExchangeTxs> = libOptions => {
  const getExchangeTxsOne = createMethod<ITransaction[]>({
    validate: validateId,
    generateRequest: generateRequestOne,
    libOptions,
  });
  const getExchangeTxsMany = createMethod<ITransaction[]>({
    validate: validateFilters,
    generateRequest: generateRequestMany,
    libOptions,
    addPaginationToArgs: ({ args: [filters], cursor, count }) => ({
      ...filters,
      after: cursor,
      ...(count ? { limit: count } : {}),
    }),
  });

  const getExchangeTxs: IGetExchangeTxs = (
    idOrFilters: string | IExchangeTxFilters = {}
  ) =>
    typeof idOrFilters === 'string'
      ? getExchangeTxsOne(idOrFilters)
      : getExchangeTxsMany(idOrFilters);

  return getExchangeTxs;
};

export default createGetExchangeTxs;
