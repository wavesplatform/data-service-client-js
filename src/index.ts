import fetch from 'node-fetch';

const { Asset } = require('@waves/data-entities');
const createParser = require('parse-json-bignumber');

export default class DataServiceClient {
  public getAssets;
  constructor(options: TLibOptions) {
    if (!options.nodeUrl)
      throw new Error(
        'No nodeUrl was presented in options object. Check constructor call.'
      );
    this.getAssets = createGetAssets(options.nodeUrl);
  }
}
export type TLibOptions = {
  nodeUrl: string;
};

type TPredicate = (...args: any[]) => boolean;
type AssetId = string;
type Parser = (text: string) => {};

const JSONBigParser = createParser();
const fetchData = (parser: Parser) => (url: string) => {
  return fetch(url)
    .then(body => body.text())
    .then(text => parser(text));
};

const notString = (value: any) => typeof value !== 'string';

const pipeM = (...fns: Function[]) => (...args: any[]) =>
  fns.reduce(
    (prev: Promise<any>, fn: Function) => prev.then(v => fn(v)),
    Promise.resolve(args)
  );
const some = (predicate: TPredicate) => (arr: any[]) => arr.some(predicate);
const validateIds = async (ids: string[]) => (
  console.log(ids),
  ids.some(notString)
    ? Promise.reject(new Error('ArgumentsError: AssetId should be string'))
    : Promise.resolve(ids)
);

const createQSForMany = (ids: string[]) =>
  ids.map((id: string) => `ids[]=${encodeURIComponent(id)}`).join('&');
const createUrlForMany = (nodeUrl: string) => (ids: string[]) =>
  `${nodeUrl}/assets?${createQSForMany(ids)}`;

const createGetAssets = (nodeUrl: string) => async (...ids: AssetId[]) =>
  pipeM(validateIds, createUrlForMany(nodeUrl), fetchData(JSONBigParser))(
    ...ids
  );
