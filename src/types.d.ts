export type TListResponseJSON<T> = {
  __type: 'list';
  data: T[];
};

export type TParser = (text: string) => any;

export type TLibOptions = {
  nodeUrl: string;
  parser: TParser;
};
export type TAssetId = string;
