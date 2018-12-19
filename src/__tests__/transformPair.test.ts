import { transformPair } from '../transform';
import { BigNumber } from '@waves/data-entities';

describe('Pairs transformation', () => {
  it('should transform pair with number', () => {
    const time = new Date();
    const pair = {
      firstPrice: 1.1,
      lastPrice: 2.1,
      low: 1,
      high: 3,
      volume: 100.22,
      quoteVolume: 99.2,
      volumeWaves: 10.33,
      weightedAveragePrice: 1.22,
      txsCount: 102,
      amountAsset: 'test1',
      priceAsset: 'test2',
    };
    const newPair = transformPair(pair);
    expect(newPair.firstPrice).toBeInstanceOf(BigNumber);
    expect(newPair.lastPrice).toBeInstanceOf(BigNumber);
    expect(newPair.low).toBeInstanceOf(BigNumber);
    expect(newPair.high).toBeInstanceOf(BigNumber);
    expect(newPair.volume).toBeInstanceOf(BigNumber);
    expect(newPair.quoteVolume).toBeInstanceOf(BigNumber);
    expect(newPair.volumeWaves).toBeInstanceOf(BigNumber);
    expect(newPair.weightedAveragePrice).toBeInstanceOf(BigNumber);
    expect(typeof newPair.txsCount).toEqual('number');
  });

  it('should transform pair with string', () => {
    const time = new Date();
    const pair = {
      firstPrice: '1.1',
      lastPrice: '2.1',
      low: '1',
      high: '3',
      volume: '100.22',
      quoteVolume: '99.2',
      volumeWaves: '10.33',
      weightedAveragePrice: '1.22',
      txsCount: 102,
      amountAsset: 'test1',
      priceAsset: 'test2',
    };
    const newPair = transformPair(pair);
    expect(newPair.firstPrice).toBeInstanceOf(BigNumber);
    expect(newPair.lastPrice).toBeInstanceOf(BigNumber);
    expect(newPair.low).toBeInstanceOf(BigNumber);
    expect(newPair.high).toBeInstanceOf(BigNumber);
    expect(newPair.volume).toBeInstanceOf(BigNumber);
    expect(newPair.quoteVolume).toBeInstanceOf(BigNumber);
    expect(newPair.volumeWaves).toBeInstanceOf(BigNumber);
    expect(newPair.weightedAveragePrice).toBeInstanceOf(BigNumber);
    expect(typeof newPair.txsCount).toEqual('number');
  });

  it('should transform correct', () => {
    const time = new Date();
    const pair = {
      firstPrice: '1.1',
      lastPrice: '2.1',
      low: '1',
      high: '3',
      volume: '100.22',
      quoteVolume: '99.2',
      volumeWaves: '10.33',
      weightedAveragePrice: '1.22',
      txsCount: 102,
      amountAsset: 'test1',
      priceAsset: 'test2',
    };
    const newPair = transformPair(pair);
    expect(newPair).toMatchSnapshot();
  });
});
