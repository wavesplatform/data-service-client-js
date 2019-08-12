import { defaultFetch, defaultParse } from './utils';
import defaultTransform from './transform';

import createGetAssets from './methods/getAssets';
import createGetAssetsByTicker from './methods/getAssetsByTicker';
import createGetCandles from './methods/getCandles';
import createGetPairs from './methods/getPairs';
import createGetExchangeTxs from './methods/getExchangeTxs';
import createGetTransferTxs from './methods/getTransferTxs';
import createGetMassTransferTxs from './methods/getMassTransferTxs';
import createGetAliases from './methods/getAliases';

import {
  ILibOptions,
  IGetExchangeTxs,
  IGetTransferTxs,
  IGetMassTransferTxs,
  TAliases,
  TGetAssets,
  TGetAssetsByTicker,
  TGetCandles,
  TGetPairs,
} from './types';

export default class DataServiceClient {
  public getPairs: TGetPairs;
  public getAssets: TGetAssets;
  public getAssetsByTicker: TGetAssetsByTicker;
  public getCandles: TGetCandles;
  public getExchangeTxs: IGetExchangeTxs;
  public getTransferTxs: IGetTransferTxs;
  public getMassTransferTxs: IGetMassTransferTxs;
  public aliases: TAliases;

  constructor(params: ILibOptions) {
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
    this.getAssetsByTicker = createGetAssetsByTicker(options);
    this.getCandles = createGetCandles(options);
    this.getPairs = createGetPairs(options);
    this.getExchangeTxs = createGetExchangeTxs(options);
    this.getTransferTxs = createGetTransferTxs(options);
    this.getMassTransferTxs = createGetMassTransferTxs(options);
    this.aliases = createGetAliases(options);
  }
}

export * from './types';
export { defaultTransform };
