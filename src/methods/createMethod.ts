import { T, pipeP } from '../utils';
import { TFunction, LibOptions } from '../types';

const createMethod = ({
  validate = T,
  generateUrl,
  libOptions,
  addPaginationToArgs,
}: TCreateMethodParams): TFunction => {
  function method(...args) {
    return pipeP(
      validate,
      generateUrl(libOptions.rootUrl),
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
  generateUrl: TFunction;
  libOptions: LibOptions;
  addPaginationToArgs?: TFunction;
};
