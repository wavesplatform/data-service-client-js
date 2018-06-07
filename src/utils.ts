import { TParser, TPredicate, TFunction } from './types';

export const fetchData = (url: string): Promise<string> => {
  return fetch(url)
    .then(
      (res: Response) =>
        res.ok
          ? res.text()
          : res.text().then(str => Promise.reject(new Error(str)))
    )
};

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
export const createQS = (obj: Object): string => {
  const qs = Object.entries(obj)
    .map(([key, valueOrValues]) => {
      return Array.isArray(valueOrValues)
        ? valueOrValues.map(v => `${key}=${v}`).join('&')
        : `${key}=${valueOrValues}`;
    })
    .join('&');
  return qs === '' ? qs : `?${qs}`;
};

export const id = _ => _;
export const T = (...args) => true;
