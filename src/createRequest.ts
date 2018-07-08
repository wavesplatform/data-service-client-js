import { createQS } from './utils';
import { LibRequest, HttpMethods } from './types';

export const createRequest = (methodUrl: string, params?: any): LibRequest => {
  const URL_MAX_LENGTH = 2000;
  if (typeof params === 'undefined') {
    return { url: methodUrl, method: HttpMethods.Get };
  }
  const getUrl = `${methodUrl}${createQS(params)}`;
  return getUrl.length > URL_MAX_LENGTH
    ? {
        url: methodUrl,
        method: HttpMethods.Post,
        body: params,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    : { url: getUrl, method: HttpMethods.Get };
};
