import { Asset, IAssetJSON } from '@waves/data-entities';
import { TAssetResponseJSON } from './types';
import { id } from './utils';

const transformer = ({ __type, data, ...rest }) => {
  switch (__type) {
    case 'list':
      return data.map(transformer);
    case 'asset':
      return transformAsset(data);
    case 'pair':
      return transformPair(data);
  }
};

const transformAsset = (data: IAssetJSON): Asset =>
  data === null ? null : new Asset(data);
const transformPair = id;

export default transformer;
