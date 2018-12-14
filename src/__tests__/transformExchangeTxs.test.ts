import { BigNumber } from '@waves/data-entities';
import { ExchangeTransactionJSON } from "../types";
import { transformExchangeTransaction } from '../transform';

const exchangeTransactionWithNumber: ExchangeTransactionJSON = {
  type: 7,
  id: "AzEgTTydY92nLJghizEV5K9wijoUAmuthJTrS3Lv5Zjy",
  sender: "3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3",
  senderPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
  fee: 300000,
  timestamp: 1544694062412,
  signature:
    "2ML4EgNUFiS8XnQAg9PXZFsJzH8gFe1C1jKxQ4L1XATN9fakkEgMoJJPAAKjQum1S9vNChAPFAGbw3vMRA1KML4n",
  order1: {
    id: "EQrvidVR7oXQQLFDrqfESfrYukg2zGVbeeEkZGndpw63",
    sender: "3PCGa38yUYZPW9bnukXT2nVURaGzpE21ijv",
    senderPublicKey: "yHW8yVDnaHGex9T2iCKefm6P152DZ23gKv5kCPwDoWM",
    matcherPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
    assetPair: {
      amountAsset: "FJTs9cC9hcNvhawNzs4xhiiZdxFa6fCG9isZbjCdo3Kd",
      priceAsset: null
    },
    orderType: "buy",
    price: 3,
    amount: 333333333333333,
    timestamp: 1544639277817,
    expiration: 1547144877817,
    matcherFee: 300000,
    signature:
      "3QKfhqMHTgeHb2b7YQN5Bkfz4ukjrW4f3puvDRJy5ocHhmGyJaXD4gQP9DsdAvzGNHmsU2JQvzyccq4DRmpYpDCn"
  },
  order2: {
    id: "CPQGRbqDGnejUS5dPM7bErQQEEP2puHawWpLwqo22nNM",
    sender: "3PB53o3SuQG7xzsv5FZNcbvLDPcmqjAJFWa",
    senderPublicKey: "AwMxKcZkngEMNx2YxPBd3yhVtSwMYEtftWiUvkubNGKd",
    matcherPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
    assetPair: {
      amountAsset: "FJTs9cC9hcNvhawNzs4xhiiZdxFa6fCG9isZbjCdo3Kd",
      priceAsset: null
    },
    orderType: "sell",
    price: 3,
    amount: 14500000000000,
    timestamp: 1544694065567,
    expiration: 1547199665567,
    matcherFee: 300000,
    signature:
      "3HSjkZ4aLYv2ZCt27BLQv9dkoULuyptX8gWt8RRqKkUhYgqpA5ue4wNaWcpS6RsGwdreEXeFFfThhWap1DCnAZgK"
  },
  price: 3,
  amount: 12979900000000,
  buyMatcherFee: 11681,
  sellMatcherFee: 268549
};

const exchangeTransactionWithString: ExchangeTransactionJSON = {
  type: 7,
  id: "AzEgTTydY92nLJghizEV5K9wijoUAmuthJTrS3Lv5Zjy",
  sender: "3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3",
  senderPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
  fee: "300000",
  timestamp: 1544694062412,
  signature:
    "2ML4EgNUFiS8XnQAg9PXZFsJzH8gFe1C1jKxQ4L1XATN9fakkEgMoJJPAAKjQum1S9vNChAPFAGbw3vMRA1KML4n",
  order1: {
    id: "EQrvidVR7oXQQLFDrqfESfrYukg2zGVbeeEkZGndpw63",
    sender: "3PCGa38yUYZPW9bnukXT2nVURaGzpE21ijv",
    senderPublicKey: "yHW8yVDnaHGex9T2iCKefm6P152DZ23gKv5kCPwDoWM",
    matcherPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
    assetPair: {
      amountAsset: "FJTs9cC9hcNvhawNzs4xhiiZdxFa6fCG9isZbjCdo3Kd",
      priceAsset: null
    },
    orderType: "buy",
    price: 3,
    amount: "3333333.33333333",
    timestamp: 1544639277817,
    expiration: 1547144877817,
    matcherFee: "300000",
    signature:
      "3QKfhqMHTgeHb2b7YQN5Bkfz4ukjrW4f3puvDRJy5ocHhmGyJaXD4gQP9DsdAvzGNHmsU2JQvzyccq4DRmpYpDCn"
  },
  order2: {
    id: "CPQGRbqDGnejUS5dPM7bErQQEEP2puHawWpLwqo22nNM",
    sender: "3PB53o3SuQG7xzsv5FZNcbvLDPcmqjAJFWa",
    senderPublicKey: "AwMxKcZkngEMNx2YxPBd3yhVtSwMYEtftWiUvkubNGKd",
    matcherPublicKey: "7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy",
    assetPair: {
      amountAsset: "FJTs9cC9hcNvhawNzs4xhiiZdxFa6fCG9isZbjCdo3Kd",
      priceAsset: null
    },
    orderType: "sell",
    price: 3,
    amount: "14500000000000",
    timestamp: 1544694065567,
    expiration: 1547199665567,
    matcherFee: "300000",
    signature:
      "3HSjkZ4aLYv2ZCt27BLQv9dkoULuyptX8gWt8RRqKkUhYgqpA5ue4wNaWcpS6RsGwdreEXeFFfThhWap1DCnAZgK"
  },
  price: "3",
  amount: "12979900000000",
  buyMatcherFee: "11681",
  sellMatcherFee: "268549"
};


describe('Exchange txs transformation', () => {
  it('should transform tx with number', () => {
    const transformedExchangeTransaction = transformExchangeTransaction(exchangeTransactionWithNumber);
    expect(transformedExchangeTransaction.fee).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.amount).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.matcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.order1.timestamp).toEqual('number');
    expect(typeof transformedExchangeTransaction.order1.expiration).toEqual('number');
    expect(transformedExchangeTransaction.order2.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order2.amount).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order2.matcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.order2.timestamp).toEqual('number');
    expect(typeof transformedExchangeTransaction.order2.expiration).toEqual('number');
    expect(transformedExchangeTransaction.buyMatcherFee).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.sellMatcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.timestamp).toEqual('number');
  });

  it('should transform tx with string', () => {
    const transformedExchangeTransaction = transformExchangeTransaction(exchangeTransactionWithString);
    expect(transformedExchangeTransaction.fee).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.amount).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order1.matcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.order1.timestamp).toEqual('number');
    expect(typeof transformedExchangeTransaction.order1.expiration).toEqual('number');
    expect(transformedExchangeTransaction.order2.price).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order2.amount).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.order2.matcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.order2.timestamp).toEqual('number');
    expect(typeof transformedExchangeTransaction.order2.expiration).toEqual('number');
    expect(transformedExchangeTransaction.buyMatcherFee).toBeInstanceOf(BigNumber);
    expect(transformedExchangeTransaction.sellMatcherFee).toBeInstanceOf(BigNumber);
    expect(typeof transformedExchangeTransaction.timestamp).toEqual('number');
  });
});
