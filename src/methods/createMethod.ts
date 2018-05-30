import { id, T, pipeP } from '../utils';
import { TFunction, TLibOptions } from '../types';
const createMethod = ({
  validate = T,
  generateUrl,
  libOptions,
}: TCreateMethodParams): TFunction =>
  pipeP(
    validate,
    generateUrl(libOptions.rootUrl),
    libOptions.fetch,
    libOptions.parse,
    libOptions.transform
  );

export { createMethod };
type TCreateMethodParams = {
  validate: TFunction;
  generateUrl: TFunction;
  libOptions: TLibOptions;
};
