import { createQS } from './utils';
import { HttpMethods, ILibRequest } from './types';

export const createRequest = (methodUrl: string, params?: any): ILibRequest => {
  const URL_MAX_LENGTH = 2000;
  if (typeof params === 'undefined') {
    return { url: methodUrl, method: HttpMethods.Get };
  }
  const getUrl = `${methodUrl}${createQS(params)}`;
  return getUrl.length > URL_MAX_LENGTH
    ? {
        url: methodUrl,
        method: HttpMethods.Post,
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
      }
    : { url: getUrl, method: HttpMethods.Get };
};
