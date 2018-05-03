type TPredicate = (...args: any[]) => boolean;
type TParser = (text: string) => {};

export const fetchData = (parser: TParser) => (url: string): Promise<{}> => {
  return fetch(url)
    .then(body => body.text())
    .then(text => parser(text));
};

export const notString = (value: any) => typeof value !== 'string';

export const pipeP = (...fns: Function[]) => (...args: any[]) =>
  fns.reduce(
    (prev: Promise<any>, fn: Function) =>
      prev.then(v => fn(v)).catch(e => Promise.reject(e)),
    Promise.resolve(args)
  );
export const some = (predicate: TPredicate) => (arr: any[]) =>
  arr.some(predicate);
