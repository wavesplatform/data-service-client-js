import { Asset, IAssetJSON, BigNumber } from "@waves/data-entities";
import { TRANSACTION_TYPE } from "@waves/ts-types";
import {
  ApiTypes,
  ExchangeTransaction,
  ExchangeTransactionJSON
} from "./types";
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
    case ApiTypes.Transaction:
      /** @var ITransaction data */
      switch (data.type) {
        case TRANSACTION_TYPE.EXCHANGE:
          return transformExchangeTransaction(data);
        default:
          return data;
      }
    default:
      return { __type, data, ...rest };
  }
};

const transformAsset = (data: IAssetJSON): Asset =>
  data === null ? null : new Asset(data);
const transformPair = id;

const transformExchangeTransaction = (
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

export default transformer;
