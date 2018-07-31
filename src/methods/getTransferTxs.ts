import {
  TCreateGetFn,
  TransferTxFilters,
  GetTransferTxs,
  LibRequest,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

// One
const validateId = id =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateRequestOne = (rootUrl: string) => (id: string): LibRequest =>
  createRequest(`${rootUrl}/transactions/transfer/${id}`);

//Many
const isFilters = (filters: any): filters is TransferTxFilters => {
  const possibleFilters = [
    'sender',
    'assetId',
    'recipient',
    'after',
    'timeStart',
    'timeEnd',
    'sort',
    'limit',
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
  filters: TransferTxFilters
): LibRequest => createRequest(`${rootUrl}/transactions/transfer`, filters);

const createGetTransferTxs: TCreateGetFn<GetTransferTxs> = libOptions => {
  const getTransferTxsOne = createMethod({
    validate: validateId,
    generateRequest: generateRequestOne,
    libOptions,
  });
  const getTransferTxsMany = createMethod({
    validate: validateFilters,
    generateRequest: generateRequestMany,
    libOptions,
    addPaginationToArgs: ({ args: [filters], cursor, count }) => ({
      ...filters,
      after: cursor,
      ...(count ? { limit: count } : {}),
    }),
  });

  const getTransferTxs: GetTransferTxs = (
    idOrFilters: string | TransferTxFilters = {}
  ) =>
    typeof idOrFilters === 'string'
      ? getTransferTxsOne(idOrFilters)
      : getTransferTxsMany(idOrFilters);

  return getTransferTxs;
};

export default createGetTransferTxs;
