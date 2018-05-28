import { TLibOptions, TAssetId, TListResponseJSON } from '../types';
import { BigNumber, AssetPair } from '@waves/data-entities';
import { some, notString, createQS, pipeP, fetchData } from '../utils';

type TGetPairsFn = (...pairs: AssetPair[]) => Promise<IPairJSON[]>;

export type IPairJSON = {
  firstPrice: BigNumber;
  lastPrice: BigNumber;
  volume: BigNumber;
  amountAsset: string;
  priceAsset: string;
};

type TPairResponseJSON = {
  __type: 'pair';
  data: IPairJSON;
};
type TPairsResponseJSON = TListResponseJSON<TPairResponseJSON>;

const validatePairs = (pairs: AssetPair[]): Promise<AssetPair[]> =>
  pairs.every(AssetPair.isAssetPair)
    ? Promise.resolve(pairs)
    : Promise.reject(
        new Error(
          'ArgumentsError: AssetPair should be object with amountAsset, priceAsset'
        )
      );

const createUrlForMany = (nodeUrl: string) => (pairs: AssetPair[]): string =>
  `${nodeUrl}/pairs?${createQS({ pairs })}`;

const mapToPairs = (res: TPairsResponseJSON): IPairJSON[] =>
  res.data.map(({ data }) => data);

const getPairs = (options: TLibOptions): TGetPairsFn =>
  pipeP(
    validatePairs,
    createUrlForMany(options.nodeUrl),
    fetchData(options.parser),
    mapToPairs
  );

export default getPairs;
