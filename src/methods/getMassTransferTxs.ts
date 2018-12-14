import {
  TCreateGetFn,
  MassTransferTxFilters,
  GetMassTransferTxs,
  LibRequest,
} from '../types';

import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

// One
const validateId = (id: string): Promise<string> =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateRequestOne = (rootUrl: string) => (id: string): LibRequest =>
  createRequest(`${rootUrl}/transactions/mass-transfer/${id}`);

//Many
const isFilters = (filters: any): filters is MassTransferTxFilters => {
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
  filters: MassTransferTxFilters
): LibRequest =>
  createRequest(`${rootUrl}/transactions/mass-transfer`, filters);

const createGetMassTransferTxs: TCreateGetFn<GetMassTransferTxs> = libOptions => {
  const getMassTransferTxsOne = createMethod({
    validate: validateId,
    generateRequest: generateRequestOne,
    libOptions,
  });
  const getMassTransferTxsMany = createMethod({
    validate: validateFilters,
    generateRequest: generateRequestMany,
    libOptions,
    addPaginationToArgs: ({ args: [filters], cursor, count }) => ({
      ...filters,
      after: cursor,
      ...(count ? { limit: count } : {}),
    }),
  });

  const getMassTransferTxs: GetMassTransferTxs = (
    idOrFilters: string | MassTransferTxFilters = {}
  ) =>
    typeof idOrFilters === 'string'
      ? getMassTransferTxsOne(idOrFilters)
      : getMassTransferTxsMany(idOrFilters);

  return getMassTransferTxs;
};

export default createGetMassTransferTxs;
