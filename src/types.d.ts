export type TListResponseJSON<T> = {
  __type: 'list';
  data: T[];
};

export type TParser = (text: string) => {};

export type TLibOptions = {
  nodeUrl: string;
  parser: TParser;
};
export type TAssetId = string;
