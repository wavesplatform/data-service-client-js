import { T, pipeP, id } from '../utils';
import { TFunction, LibOptions, PaginationOptions } from '../types';

const createMethod = ({
  validate = T,
  generateRequest,
  libOptions,
  addPaginationToArgs,
}: TCreateMethodParams): TFunction => {
  function method(...args: any[]): any {
    return pipeP(
      validate,
      generateRequest(libOptions.rootUrl),
      ({ url, ...options }) => libOptions.fetch(url, options),
      libOptions.parse ? libOptions.parse : JSON.parse,
      rawData =>
        pipeP(
          libOptions.transform ? libOptions.transform : id,
          addPagination({ method, args, addPaginationToArgs, rawData })
        )(rawData)
    )(...args);
  }
  return method;
};

const addPagination = ({ method, args, addPaginationToArgs, rawData }: PaginationOptions) => (
  data: any
) => {
  if (!data || !addPaginationToArgs || !rawData || !rawData.lastCursor) {
    return { data };
  }
  return {
    data,
    fetchMore: (count: number) =>
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
