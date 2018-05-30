import { Asset, IAssetJSON, AssetPair } from '@waves/data-entities';
import getAssetsFn from './methods/getAssets';
import getPairsFn from './methods/getPairs';
import { pipeP, fetchData } from './utils';
import defaultTransform from './transform';

import { TAssetId, TLibOptions, IPairJSON } from './types';
export default class DataServiceClient {
  private options: TLibOptions;
  constructor(options: TLibOptions) {
    this.options = options;
    if (!options.transform) {
      this.options.transform = defaultTransform;
    }
    if (!options.rootUrl) {
      throw new Error(
        'No rootUrl was presented in options object. Check constructor call.'
      );
    }
  }

  public getPairs(...pairs: AssetPair[]): Promise<IPairJSON[]> {
    return getPairsFn(this.options)(...pairs);
  }
  public getAssets(...ids: TAssetId[]): Promise<Asset[]> {
    return getAssetsFn(this.options)(...ids);
  }
}
