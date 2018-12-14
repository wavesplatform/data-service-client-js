import { Asset, IAssetJSON, BigNumber } from '@waves/data-entities';
import { TRANSACTION_TYPE } from "@waves/ts-types";
import { ApiTypes, TCandleBase, TApiResponse, TApiElement, TransformationResult, ExchangeTransaction, ExchangeTransactionJSON } from './types';
import { id } from './utils';

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


export const transformExchangeTransaction = (
  data: ExchangeTransactionJSON
): ExchangeTransaction => ({
  ...data,
  fee: new BigNumber(data.fee),
  price: new BigNumber(data.price),
  amount: new BigNumber(data.amount),
  buyMatcherFee: new BigNumber(data.buyMatcherFee),
  sellMatcherFee: new BigNumber(data.sellMatcherFee),
  order1: {
    ...data.order1,
    price: new BigNumber(data.order1.price),
    amount: new BigNumber(data.order1.amount),
    matcherFee: new BigNumber(data.order1.matcherFee)
  },
  order2: {
    ...data.order2,
    price: new BigNumber(data.order2.price),
    amount: new BigNumber(data.order2.amount),
    matcherFee: new BigNumber(data.order2.matcherFee)
  }
});

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
        /** @var ITransaction data */
        switch (el.data.type) {
          case TRANSACTION_TYPE.EXCHANGE:
            return transformExchangeTransaction(el.data);
          default:
            return el.data;
        }
      default:
        throw 'Transformation Error';
    }
  }
};

export default transformer;
