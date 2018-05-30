import { Asset, IAssetJSON } from '@waves/data-entities';
import { TAssetResponseJSON, ApiTypes } from './types';
import { id } from './utils';

const transformer = ({ __type, data, ...rest }) => {
  switch (__type) {
    case ApiTypes.List:
      return data.map(transformer);
    case ApiTypes.Asset:
      return transformAsset(data);
    case ApiTypes.Pair:
      return transformPair(data);
  }
};

const transformAsset = (data: IAssetJSON): Asset =>
  data === null ? null : new Asset(data);
const transformPair = id;

export default transformer;
