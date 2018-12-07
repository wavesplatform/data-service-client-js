import {
  TCreateGetFn,
  TCandlesParams,
  LibOptions,
  LibRequest,
  TGetCandles
} from "../types";

import { createMethod } from "./createMethod";
import { createRequest } from "../createRequest";

type CandlesRequestFilters = [string, string, TCandlesParams];

const isFilters = (filters: any): filters is CandlesRequestFilters => {
  const possibleParams = ["timeStart", "timeEnd", "interval"];
  return (
    Array.isArray(filters) && filters.length === 3 &&
    typeof filters[0] === "string" && typeof filters[1] === "string" &&
    typeof filters[2] === "object" && 
    Object.keys(filters[2]).every(k => possibleParams.includes(k))
  );
};
const validateFilters = (filters: any) =>
  isFilters(filters)
    ? Promise.resolve(filters)
    : Promise.reject("Wrong filters object");

const createRequestForCandles = (rootUrl: string) => ([
  amountAssetId,
  priceAssetId,
  params
]: CandlesRequestFilters): LibRequest =>
  createRequest(`${rootUrl}/candles/${amountAssetId}/${priceAssetId}`, params);

const createGetCandles: TCreateGetFn<TGetCandles> = (libOptions: LibOptions) =>
  createMethod({
    validate: validateFilters,
    generateRequest: createRequestForCandles,
    libOptions
  });

export default createGetCandles;
