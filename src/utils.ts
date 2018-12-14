import { TPredicate, TFunction } from './types';

export const noop = () => {};
export const defaultFetch = (
  url: RequestInfo,
  options?: RequestInit
): Promise<string> => {
  return fetch(url, options).then((res: Response) =>
    res.ok ? res.text() : res.text().then(str => Promise.reject(new Error(str)))
  );
};
export const defaultParse = JSON.parse.bind(JSON);
export const isNotString = (value: any): boolean => typeof value !== 'string';
export const pipeP = (...fns: TFunction[]) => (...args: any[]): Promise<any> =>
  fns.reduce(
    (prev, fn) => prev.then(fn),
    Promise.resolve(args.length === 1 ? args[0] : args)
  );
export const some = (predicate: TPredicate) => (arr: any[]): boolean =>
  arr.some(predicate);

/**
 * @param obj flat object with primitives or arrays of primitives as values
 * @returns query string for obj
 */
/**
 * customSerialize :: a -> string
 */
const customSerialize = (v: Date | any): string => {
  switch (true) {
    case v instanceof Date:
      return v.toISOString();
    default:
      return v;
  }
};
const createKeyValue = (key: any, v: any): string =>
  `${key}=${customSerialize(v)}`;
export const createQS = (obj: Object): string => {
  const qs = Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .map(([key, valueOrValues]) => {
      return Array.isArray(valueOrValues)
        ? valueOrValues.map(v => createKeyValue(key, v)).join('&')
        : createKeyValue(key, valueOrValues);
    })
    .join('&');
  return qs === '' ? qs : `?${qs}`;
};

export const id = (_: any): any => _;
export const T = (...args: any[]): boolean => true;
