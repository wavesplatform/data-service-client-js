import { transformCandle } from '../transform';
import { BigNumber } from '@waves/data-entities';

describe('Candles transformation', () => {
  it('should transform null candle', () => {
    const time = new Date();
    const emptyCandle = {
      time,
      open: null,
      close: null,
      high: null,
      low: null,
      volume: null,
      quoteVolume: null,
      weightedAveragePrice: null,
      maxHeight: null,
      txsCoung: null,
    };
    expect(transformCandle(emptyCandle)).toEqual(emptyCandle);
  });

  it('should transform candle with number', () => {
    const time = new Date();
    const candle = {
      time,
      open: 0.1,
      close: 0.9,
      high: 1,
      low: 0.001,
      volume: 100.2,
      quoteVolume: 0.001,
      weightedAveragePrice: 0.112,
      maxHeight: 1832,
      txsCoung: 12,
    };
    const newCandle = transformCandle(candle);
    expect(newCandle.open).toBeInstanceOf(BigNumber);
    expect(newCandle.close).toBeInstanceOf(BigNumber);
    expect(newCandle.high).toBeInstanceOf(BigNumber);
    expect(newCandle.low).toBeInstanceOf(BigNumber);
    expect(newCandle.volume).toBeInstanceOf(BigNumber);
    expect(newCandle.quoteVolume).toBeInstanceOf(BigNumber);
    expect(typeof newCandle.maxHeight).toEqual('number');
    expect(typeof newCandle.txsCoung).toEqual('number');
  });

  it('should transform candle with string', () => {
    const time = new Date();
    const candle = {
      time,
      open: '0.1',
      close: '0.9',
      high: '1',
      low: '0.001',
      volume: '100.2',
      quoteVolume: '0.001',
      weightedAveragePrice: '0.112',
      maxHeight: 1832,
      txsCoung: 12,
    };
    const newCandle = transformCandle(candle);
    expect(newCandle.open).toBeInstanceOf(BigNumber);
    expect(newCandle.close).toBeInstanceOf(BigNumber);
    expect(newCandle.high).toBeInstanceOf(BigNumber);
    expect(newCandle.low).toBeInstanceOf(BigNumber);
    expect(newCandle.volume).toBeInstanceOf(BigNumber);
    expect(newCandle.quoteVolume).toBeInstanceOf(BigNumber);
    expect(typeof newCandle.maxHeight).toEqual('number');
    expect(typeof newCandle.txsCoung).toEqual('number');
  });

  it('should transform correct', () => {
    const time = new Date(1544800500076);
    const candle = {
      time,
      open: '0.1',
      close: 0.9,
      high: '1',
      low: '0.001',
      volume: 100.2,
      quoteVolume: '0.001',
      weightedAveragePrice: 0.11,
      maxHeight: 1832,
      txsCoung: 12,
    };
    const newCandle = transformCandle(candle);
    expect(newCandle).toMatchSnapshot();
  });
});
