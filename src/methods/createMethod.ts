import { T, pipeP } from '../utils';
import { TFunction, LibOptions } from '../types';

const createMethod = ({
  validate = T,
  generateRequest,
  libOptions,
  addPaginationToArgs,
}: TCreateMethodParams): TFunction => {
  function method(...args) {
    return pipeP(
      validate,
      generateRequest(libOptions.rootUrl),
      libOptions.fetch,
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
type TCreateMethodParams = {
  validate: TFunction;
  generateRequest: TFunction;
  libOptions: LibOptions;
  addPaginationToArgs?: TFunction;
};
