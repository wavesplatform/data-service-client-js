import { Asset, IAssetJSON, BigNumber } from "@waves/data-entities";
import { ApiTypes, TCandleBase, TCandle } from "./types";
import { id } from "./utils";
const transformer = ({ __type, data, ...rest }) => {
  switch (__type) {
    case ApiTypes.List:
      return data.map(transformer);
    case ApiTypes.Asset:
      return transformAsset(data);
    case ApiTypes.Alias:
      return data;
    case ApiTypes.Pair:
      return transformPair(data);
    case ApiTypes.Candle:
      return transformCandle(data);
    case ApiTypes.Transaction:
      return data;
    default:
      return { __type, data, ...rest };
  }
};

const transformAsset = (data: IAssetJSON): Asset =>
  data === null ? null : new Asset(data);

const transformPair = id;

const transformCandle = (candle: TCandleBase<string | number>): TCandle =>
  candle === null
    ? null
    : {
        ...candle,
        open: new BigNumber(candle.open),
        close: new BigNumber(candle.close),
        high: new BigNumber(candle.high),
        low: new BigNumber(candle.low),
        weightedAveragePrice: new BigNumber(candle.weightedAveragePrice),
        volume: new BigNumber(candle.volume),
        quoteVolume: new BigNumber(candle.quoteVolume)
      };

export default transformer;
