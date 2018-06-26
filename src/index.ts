import { defaultFetch, defaultParse } from './utils';
import defaultTransform from './transform';

import createGetAssets from './methods/getAssets';
import createGetPairs from './methods/getPairs';
import createGetExchangeTxs from './methods/getExchangeTxs';
import createGetAliases from './methods/getAliases';

import {
  LibOptions,
  TGetAssets,
  TGetPairs,
  IGetExchangeTxs,
  aliases,
} from './types';

export default class DataServiceClient {
  public getPairs: TGetPairs;
  public getAssets: TGetAssets;
  public getExchangeTxs: IGetExchangeTxs;
  public aliases: aliases;

  constructor(params: LibOptions) {
    let options = { ...params };
    if (!options.rootUrl) {
      throw new Error(
        'No rootUrl was presented in options object. Check constructor call.'
      );
    }
    // Add defaults
    if (!options.transform) {
      options.transform = defaultTransform;
    }
    if (!options.fetch) {
      options.fetch = defaultFetch;
    }
    if (!options.parse) {
      options.parse = defaultParse;
    }

    // Create methods
    this.getAssets = createGetAssets(options);
    this.getPairs = createGetPairs(options);
    this.getExchangeTxs = createGetExchangeTxs(options);
    this.aliases = createGetAliases(options);
  }
}

export { defaultTransform };
