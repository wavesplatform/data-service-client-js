import {
  ILibOptions,
  ILibRequest,
  TCreateGetFn,
  TAliasesByAddressParams,
  TAliasId,
  TAlias,
  TAliases,
} from '../types';

import { isNotString } from '../utils';
import { createMethod } from './createMethod';
import { createRequest } from '../createRequest';

const validateId = (id: string): Promise<string> =>
  isNotString(id)
    ? Promise.reject(new Error('ArgumentsError: aliasId should be string'))
    : Promise.resolve(id);

const validateByAddressParams = ([
  address,
  options,
]: TAliasesByAddressParams): Promise<TAliasesByAddressParams> =>
  isNotString(address)
    ? Promise.reject(new Error('ArgumentsError: address should be string'))
    : Promise.resolve([address, options] as TAliasesByAddressParams);

const createRequestForId = (rootUrl: string) => (id: TAliasId): ILibRequest =>
  createRequest(`${rootUrl}/aliases/${id}`);

const createRequestForAddress = (rootUrl: string) => ([
  address,
  { showBroken },
]: TAliasesByAddressParams): ILibRequest =>
  createRequest(`${rootUrl}/aliases`, {
    address,
    showBroken,
  });

const createGetAliases: TCreateGetFn<TAliases> = (libOptions: ILibOptions) => ({
  getById: createMethod<TAlias[]>({
    validate: validateId,
    generateRequest: createRequestForId,
    libOptions,
  }),
  getByAddress: (address, options = {}) =>
    createMethod<TAlias[]>({
      validate: validateByAddressParams,
      generateRequest: createRequestForAddress,
      libOptions,
    })(address, options),
});

export default createGetAliases;
