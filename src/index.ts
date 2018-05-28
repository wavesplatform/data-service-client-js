import { Asset, IAssetJSON, AssetPair } from '@waves/data-entities';

import getAssetsFn from './methods/getAssets';
import getPairs, { IPairJSON } from './methods/getPairs';
import { pipeP, fetchData } from './utils';

import { TAssetId, TLibOptions } from './types';

export default class DataServiceClient {
  private options: TLibOptions;
  constructor(options: TLibOptions) {
    this.options = options;

    if (!options.nodeUrl) {
      throw new Error(
        'No nodeUrl was presented in options object. Check constructor call.'
      );
    }
  }

  public getPairs(...pairs: AssetPair[]): Promise<IPairJSON[]> {
    return getPairs(this.options)(...pairs);
  }
  public getAssets(...ids: TAssetId[]): Promise<Asset[]> {
    return getAssetsFn(this.options)(...ids);
  }
}
