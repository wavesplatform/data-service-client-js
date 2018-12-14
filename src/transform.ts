import { Asset, IAssetJSON, BigNumber } from '@waves/data-entities';
import { ApiTypes, TCandleBase, TApiResponse, TApiElement } from './types';
import { id } from './utils';

const transformer = (response: TApiResponse): any => {
  switch (response.__type) {
    case ApiTypes.List:
      return response.data.map(transformSingleElement);
    default:
      return transformSingleElement(response);
  }
};

const transformSingleElement = (el: TApiElement): any => {
  if (el === null) return null;
  else {
    switch (el.__type) {
      case ApiTypes.Asset:
        return transformAsset(el.data);
      case ApiTypes.Alias:
        return el.data;
      case ApiTypes.Pair:
        return transformPair(el.data);
      case ApiTypes.Candle:
        return transformCandle(el.data);
      case ApiTypes.Transaction:
        return el.data;
      default:
        console.log(el);
        throw 'Transformation Error';
      // return el.data;
    }
  }
};

const transformAsset = (data: IAssetJSON | null): Asset | null =>
  data === null ? null : new Asset(data);

const transformPair = id;

const toBigNumber = (v: string | number | null) =>
  v ? new BigNumber(v) : null;
const transformCandle = (
  candle: TCandleBase<string | number> | null
): TCandleBase<BigNumber | null> | null =>
  candle === null
    ? null
    : {
        ...candle,
        open: toBigNumber(candle.open),
        close: toBigNumber(candle.close),
        high: toBigNumber(candle.high),
        low: toBigNumber(candle.low),
        weightedAveragePrice: toBigNumber(candle.weightedAveragePrice),
        volume: toBigNumber(candle.volume),
        quoteVolume: toBigNumber(candle.quoteVolume)
      };

export default transformer;
