import { AliasId, aliases, TCreateGetFn, LibOptions } from '../types';

import { isNotString, createQS } from '../utils';
import { createMethod } from './createMethod';

const validateId = (id: string): Promise<string> =>
  isNotString(id)
    ? Promise.reject(new Error('ArgumentsError: aliasId should be string'))
    : Promise.resolve(id);

const createUrlForId = (rootUrl: string) => (id: AliasId): string =>
  `${rootUrl}/aliases/${id}`;
const createUrlForAddress = (rootUrl: string) => (address: string): string =>
  `${rootUrl}/aliases${createQS({ address })}`;

const createGetAliases: TCreateGetFn<aliases> = (libOptions: LibOptions) => ({
  getById: createMethod({
    validate: validateId,
    generateUrl: createUrlForId,
    libOptions,
  }),
  getByAddress: createMethod({
    validate: validateId,
    generateUrl: createUrlForAddress,
    libOptions,
  }),
});

export default createGetAliases;
