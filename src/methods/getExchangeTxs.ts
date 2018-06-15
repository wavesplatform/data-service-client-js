import { TCreateGetFn, TransactionFilters, IGetExchangeTxs } from '../types';

import { createQS } from '../utils';
import { createMethod } from './createMethod';

// One
const validateId = id =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateUrlOne = (rootUrl: string) => (id: string) =>
  `${rootUrl}/transactions/exchange/${id}`;

//Many
const isFilters = (filters: any): filters is TransactionFilters => {
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

const generateUrlMany = (rootUrl: string) => (filters: TransactionFilters) =>
  `${rootUrl}/transactions/exchange${createQS(filters)}`;

const createGetExchangeTxs: TCreateGetFn<IGetExchangeTxs> = libOptions => {
  const getExchangeTxsOne = createMethod({
    validate: validateId,
    generateUrl: generateUrlOne,
    libOptions,
  });
  const getExchangeTxsMany = createMethod({
    validate: validateFilters,
    generateUrl: generateUrlMany,
    libOptions,
    addPaginationToArgs: ({ args: [filters], cursor, count }) => ({
      ...filters,
      after: cursor,
      ...(count ? { limit: count } : {}),
    }),
  });

  const getExchangeTxs: IGetExchangeTxs = (
    idOrFilters: string | TransactionFilters = {}
  ) =>
    typeof idOrFilters === 'string'
      ? getExchangeTxsOne(idOrFilters)
      : getExchangeTxsMany(idOrFilters);

  return getExchangeTxs;
};

export default createGetExchangeTxs;
