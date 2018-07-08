import {
  AliasId,
  aliases,
  TCreateGetFn,
  LibOptions,
  LibRequest,
} from '../types';

import { isNotString } from '../utils';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

export type AliasesByAddressOptions = { showBroken?: boolean };
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

const createRequestForId = (rootUrl: string) => (id: AliasId): LibRequest =>
  createRequest(`${rootUrl}/aliases/${id}`);

const createRequestForAddress = (rootUrl: string) => ([
  address,
  { showBroken },
]: AliasesByAddressParams): LibRequest =>
  createRequest(`${rootUrl}/aliases`, {
    address,
    showBroken,
  });

const createGetAliases: TCreateGetFn<aliases> = (libOptions: LibOptions) => ({
  getById: createMethod({
    validate: validateId,
    generateRequest: createRequestForId,
    libOptions,
  }),
  getByAddress: (address, options = {}) =>
    createMethod({
      validate: validateByAddressParams,
      generateRequest: createRequestForAddress,
      libOptions,
    })(address, options),
});

export default createGetAliases;
