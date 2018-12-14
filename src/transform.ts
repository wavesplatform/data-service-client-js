import { Asset, IAssetJSON, BigNumber } from '@waves/data-entities';
import { ApiTypes, TCandleBase, TApiResponse, TApiElement, TransformationResult } from './types';
import { id } from './utils';

const transformer = (response: TApiResponse): TransformationResult | TransformationResult[] => {
  switch (response.__type) {
    case ApiTypes.List:
      return response.data.map(transformSingleElement);
    default:
      return transformSingleElement(response);
  }
};

const transformSingleElement = (el: TApiElement): TransformationResult => {
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
        throw 'Transformation Error';
    }
  }
};

const transformAsset = (data: IAssetJSON | null): Asset | null =>
  data === null ? null : new Asset(data);

const transformPair = id;

const toBigNumber = (v: string | number | null) =>
  v ? new BigNumber(v) : null;

export const transformCandle = (
  candle: TCandleBase<string | number>
): TCandleBase<BigNumber | null> => ({
  ...candle,
  open: toBigNumber(candle.open),
  close: toBigNumber(candle.close),
  high: toBigNumber(candle.high),
  low: toBigNumber(candle.low),
  weightedAveragePrice: toBigNumber(candle.weightedAveragePrice),
  volume: toBigNumber(candle.volume),
  quoteVolume: toBigNumber(candle.quoteVolume),
});

export default transformer;
