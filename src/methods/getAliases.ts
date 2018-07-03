import { AliasId, aliases, TCreateGetFn, LibOptions } from '../types';

import { isNotString, createQS } from '../utils';
import { createMethod } from './createMethod';

export type AliasesByAddressOptions = { showBlocked?: boolean };
type AliasesByAddressParams = [string, AliasesByAddressOptions];

const validateId = (id: string): Promise<string> =>
  isNotString(id)
    ? Promise.reject(new Error('ArgumentsError: aliasId should be string'))
    : Promise.resolve(id);

const validateByAddressParams = ([
  address,
  options,
]: AliasesByAddressParams): Promise<AliasesByAddressParams> =>
  isNotString(address)
    ? Promise.reject(new Error('ArgumentsError: address should be string'))
    : Promise.resolve([address, options] as AliasesByAddressParams);

const createUrlForId = (rootUrl: string) => (id: AliasId): string =>
  `${rootUrl}/aliases/${id}`;

const createUrlForAddress = (rootUrl: string) => ([
  address,
  { showBlocked },
]: AliasesByAddressParams): string =>
  `${rootUrl}/aliases${createQS({
    address,
    showBlocked,
  })}`;

const createGetAliases: TCreateGetFn<aliases> = (libOptions: LibOptions) => ({
  getById: createMethod({
    validate: validateId,
    generateUrl: createUrlForId,
    libOptions,
  }),
  getByAddress: (address, options = {}) =>
    createMethod({
      validate: validateByAddressParams,
      generateUrl: createUrlForAddress,
      libOptions,
    })(address, options),
});

export default createGetAliases;
