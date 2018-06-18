import { Asset, IAssetJSON } from '@waves/data-entities';
import { ApiTypes } from './types';
import { id } from './utils';
const transformer = ({ __type, data, ...rest }) => {
  switch (__type) {
    case ApiTypes.List:
      return data.map(transformer);
    case ApiTypes.Asset:
      return transformAsset(data);
    case ApiTypes.Pair:
      return transformPair(data);
    case ApiTypes.Transaction:
      return data;
    default:
      return { __type, data, ...rest };
  }
};

const transformAsset = (data: IAssetJSON): Asset =>
  data === null ? null : new Asset(data);
const transformPair = id;

export default transformer;
