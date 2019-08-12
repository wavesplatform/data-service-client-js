import { T, pipeP } from '../utils';
import { TFunction, ILibOptions, ILibRequest, TResponse } from '../types';

type TCreateMethodParams = {
  validate: TFunction<any>;
  generateRequest: TFunction<TFunction<ILibRequest>>;
  libOptions: ILibOptions;
  addPaginationToArgs?: TFunction<any>;
};

const createMethod = <T>({
  validate = T,
  generateRequest,
  libOptions,
  addPaginationToArgs,
}: TCreateMethodParams): TFunction<TResponse<T>> => {
  function method(...args) {
    return pipeP(
      validate,
      generateRequest(libOptions.rootUrl),
      ({ url, ...options }) => libOptions.fetch(url, options),
      libOptions.parse,
      rawData =>
        pipeP(
          libOptions.transform,
          addPagination({ method, args, addPaginationToArgs, rawData })
        )(rawData)
    )(...args);
  }
  return method;
};

const addPagination = ({
  method,
  args,
  addPaginationToArgs,
  rawData,
}) => data => {
  if (!data || !addPaginationToArgs || !rawData || !rawData.lastCursor) {
    return { data };
  }
  return {
    data,
    fetchMore: count =>
      method(addPaginationToArgs({ args, cursor: rawData.lastCursor, count })),
  };
};

export { createMethod };
