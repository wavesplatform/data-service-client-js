import {
  TAssetId,
  TAssetsResponseJSON,
  TLibOptions,
  TCreateGetFn,
  Transaction,
  TransactionFilters,
  IGetExchangeTxs,
} from '../types';
import { Asset } from '@waves/data-entities';

import { some, notString, createQS, pipeP, fetchData } from '../utils';
import { createMethod } from './createMethod';

// One
const validateId = id =>
  typeof id === 'string' ? Promise.resolve(id) : Promise.reject('Wrong id');
const generateUrlOne = (rootUrl: string) => (id: string) =>
  `${rootUrl}/transactions/exchange/${id}`;

//Many
const possibleFilters = [
  'timeStart',
  'timeEnd',
  'limit',
  'sort',
  'matcher',
  'sender',
  'amountAsset',
  'priceAsset',
];
const validateFilters = filters =>
  typeof filters === 'object' &&
  Object.keys(filters).every(k => possibleFilters.includes(k))
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
  });

  const getExchangeTxs: IGetExchangeTxs = (
    idOrFilters?: TransactionFilters | string
  ) => {
    switch (true) {
      case idOrFilters === undefined:
        return getExchangeTxsMany({});
      case typeof idOrFilters === 'string':
        return getExchangeTxsOne(idOrFilters);
      default:
        return getExchangeTxsMany(idOrFilters);
    }
  };
  return getExchangeTxs;
};

export { createGetExchangeTxs };
